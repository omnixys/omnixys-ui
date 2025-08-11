// app/actions/shareAction.ts
"use server";

import { imagekit } from "./utils";
import crypto from "node:crypto";

type ImageType = "original" | "wide" | "square";
type Settings = { type: ImageType; sensitive: boolean };

type ShareResult = {
  success: true;
  fileId: string;
  url: string;
  filePath: string;
  isImage: boolean;
  width?: number;
  height?: number;
} | {
  success: false;
  error: string;
  cause?: unknown;
};

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

function buildPreTransformation(type: ImageType): string {
  // Basisbreite fest auf 600 – kannst du gern parametrisierbar machen
  switch (type) {
    case "square":
      return "w-600,ar-1-1";
    case "wide":
      return "w-600,ar-16-9";
    default:
      return "w-600"; // original ratio mit fester Breite
  }
}

function isImage(mime: string) {
  return /^image\//i.test(mime);
}
function isVideo(mime: string) {
  return /^video\//i.test(mime);
}

// ImageKit SDK ist callback-basiert – wir machen es Promise-basiert
function uploadToImageKit(opts: Parameters<typeof imagekit.upload>[0]) {
  return new Promise<any>((resolve, reject) => {
    imagekit.upload(opts, (error: unknown, result: unknown) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

export async function shareAction(
  formData: FormData,
  settings: Settings
): Promise<ShareResult> {
  try {
    const file = formData.get("file") as File | null;
    // Optional: const desc = formData.get("desc") as string | null;

    if (!file) {
      return { success: false, error: "Kein Datei-Upload gefunden (field 'file')." };
    }

    if (!isImage(file.type) && !isVideo(file.type)) {
      return { success: false, error: `Nicht unterstützter MIME-Typ: ${file.type}` };
    }

    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) {
      return { success: false, error: `Datei zu groß (> ${Math.round(MAX_BYTES/1024/1024)} MB).` };
    }

    const buffer = Buffer.from(bytes);
    const isImg = isImage(file.type);

    // Stabiler Dateiname (vermeidet Kollisionen)
    const uniqueSuffix = crypto.randomUUID();
    const baseName = file.name?.replace(/\s+/g, "_") || "upload";
    const finalName = `${baseName}_${uniqueSuffix}`;

    // Transformation nur für Bilder anwenden
    const preTransform = buildPreTransformation(settings.type);

    const result = await uploadToImageKit({
      file: buffer,
      fileName: finalName,
      folder: "/posts",
      useUniqueFileName: true,
      // Nur bei Bildern pre-Transformation setzen
      ...(isImg && {
        transformation: { pre: preTransform },
      }),
      // Metadaten – landen in ImageKit "Custom Metadata"
      customMetadata: {
        sensitive: settings.sensitive,
        // ...(desc ? { description: desc } : {}),
      },
      // Optional: tags: ["post", settings.type, settings.sensitive ? "sensitive" : "safe"],
      // isPrivateFile: false, // falls du private Assets verwenden willst → true
    });

    // result ist vom SDK typ-unklar, wir picken die Felder, die du brauchst:
    const { fileId, url, filePath, width, height } = result as {
      fileId: string;
      url: string;
      filePath: string;
      width?: number;
      height?: number;
    };

    return {
      success: true,
      fileId,
      url,
      filePath,
      isImage: isImg,
      width,
      height,
    };
  } catch (cause) {
    console.error("[shareAction] Upload failed:", cause);
    return { success: false, error: "Upload fehlgeschlagen.", cause };
  }
}
