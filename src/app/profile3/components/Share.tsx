// components/Share.tsx
"use client";

import * as React from "react";
import { useState, useTransition } from "react";

import NextImage from "next/image";
import { Box, Stack, TextField, IconButton, Button, Chip, Tooltip, LinearProgress, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Image from "./Image"; // deine ImageKit-MUI-Version
import ImageEditor from "./ImageEditor";
import { shareAction } from "../actions";

type FormatType = "original" | "wide" | "square";

const Share: React.FC = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{ type: FormatType; sensitive: boolean }>({
    type: "original",
    sensitive: false,
  });
  const [isPending, startTransition] = useTransition();
  const [desc, setDesc] = useState(""); // Mock: kontrolliertes Feld

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setMedia(file);
  };

  const previewURL = media ? URL.createObjectURL(media) : null;
  const isImage = media?.type.startsWith("image/");
  const isVideo = media?.type.startsWith("video/");

  // Hilfs-Styles für Aspect-Ratio mit MUI
  const aspectRatio =
    settings.type === "square" ? "1 / 1" : settings.type === "wide" ? "16 / 9" : undefined;

  return (
    <Box
      component="form"
      action={(formData: FormData) => {
        if (media) formData.set("file", media);
        startTransition(async () => {
          await shareAction(formData, settings);
          // Optional: Snackbar/Reset
          setMedia(null);
          setDesc("");
        });
      }}
      sx={{ p: 2, display: "flex", gap: 2 }}
    >
      {/* AVATAR */}
      <Box sx={{ position: "relative", width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
        <Image path="general/avatar.png" alt="Avatar" w={100} h={100} tr />
      </Box>

      {/* RIGHT SIDE */}
      <Stack flex={1} gap={2}>
        <TextField
          name="desc"
          placeholder="What is happening?!"
          variant="standard"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{
            "& input": { fontSize: 20 },
            bgcolor: "transparent",
          }}
        />

        {/* PREVIEW IMAGE */}
        {isImage && previewURL && (
          <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 600,
                mx: 0,
                aspectRatio: aspectRatio,
                height: aspectRatio ? "auto" : 600,
                bgcolor: "black",
              }}
            >
              <NextImage
                src={previewURL}
                alt="preview"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                priority
                style={{
                  objectFit: settings.type === "original" ? "contain" : "cover",
                  filter: settings.sensitive ? "blur(8px)" : "none",
                }}
              />
            </Box>

            {/* Edit Button (links oben) */}
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => setIsEditorOpen(true)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "common.white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Remove Button (rechts oben) */}
            <Tooltip title="Remove">
              <IconButton
                size="small"
                onClick={() => setMedia(null)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "common.white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Sensitive Chip (rechts unten) */}
            <Chip
              label={settings.sensitive ? "Sensitive" : "Safe"}
              color={settings.sensitive ? "error" : "default"}
              size="small"
              sx={{ position: "absolute", right: 8, bottom: 8, bgcolor: "rgba(0,0,0,0.5)", color: "white" }}
            />
          </Box>
        )}

        {/* PREVIEW VIDEO */}
        {isVideo && previewURL && (
          <Box sx={{ position: "relative", maxWidth: 600, borderRadius: 2, overflow: "hidden" }}>
            <video src={previewURL} controls style={{ width: "100%", display: "block" }} />
            <Tooltip title="Remove">
              <IconButton
                size="small"
                onClick={() => setMedia(null)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "common.white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Image Editor */}
        {isEditorOpen && previewURL && (
          <ImageEditor
            open={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}

        {/* Action Row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap">
          {/* Left: Upload Icons */}
          <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              id="file"
              accept="image/*,video/*"
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <Tooltip title="Bild/Video hochladen">
                <IconButton component="span">
                  <Image path="icons/image.svg" alt="upload" w={20} h={20} />
                </IconButton>
              </Tooltip>
            </label>

            <Tooltip title="GIF">
              <IconButton>
                <Image path="icons/gif.svg" alt="gif" w={20} h={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Umfrage">
              <IconButton>
                <Image path="icons/poll.svg" alt="poll" w={20} h={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Emoji">
              <IconButton>
                <Image path="icons/emoji.svg" alt="emoji" w={20} h={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Planen">
              <IconButton>
                <Image path="icons/schedule.svg" alt="schedule" w={20} h={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Standort">
              <IconButton>
                <Image path="icons/location.svg" alt="location" w={20} h={20} />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Right: Post Button */}
          <Stack direction="row" alignItems="center" gap={1}>
            {isPending && <LinearProgress sx={{ width: 140 }} />}
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={isPending}
            >
              Post
            </Button>
          </Stack>
        </Stack>

        {/* kleine Hilfezeile */}
        {!media && (
          <Typography variant="caption" color="text.secondary">
            Tipp: Du kannst Formate im Editor auf <strong>Original / Wide / Square</strong> umstellen und „Sensitive“ setzen.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Share;
