// components/Post.tsx

'use client'

import * as React from "react";
import Link from "next/link";
import { Box, Stack, Typography, Avatar, Divider, Tooltip } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import Image from "./Image";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import Video from "./Video";
// import { imagekit } from "@/utils"; // wenn du real fetchen willst

interface FileDetailsResponse {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: "image" | "video";
  customMetadata?: { sensitive: boolean };
}

export type PostProps = { type?: "status" | "comment" };

// ---- Mock-Daten (kannst du auslagern) ----
const mockFileDetails: FileDetailsResponse = {
  width: 1200,
  height: 800,
  filePath: "general/post.jpeg",
  url: "https://example.com/general/post.jpeg",
  fileType: "image",
  customMetadata: { sensitive: false },
};

const mockPost = {
  author: {
    name: "Lama Dev",
    handle: "@lamaWebDev",
    avatarPath: "general/avatar.png",
  },
  repostedBy: "Lama Dev",
  createdFromNow: "1 day ago",
  createdAtAbs: "8:41 PM · Dec 5, 2024",
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, animi. Laborum commodi aliquam alias molestias odio, ab in, reprehenderit excepturi temporibus, ducimus necessitatibus fugiat iure nam voluptas soluta pariatur inventore.",
  interactions: { comments: 157, reposts: 157, likes: 157, isLiked: false, isBookmarked: false },
};

// ---- Optional: echtes Laden über ImageKit (auskommentiert) ----
// async function getFileDetails(fileId: string): Promise<FileDetailsResponse> {
//   return new Promise((resolve, reject) => {
//     imagekit.getFileDetails(fileId, (error: unknown, result: unknown) => {
//       if (error) reject(error);
//       else resolve(result as FileDetailsResponse);
//     });
//   });
// }

const Post = ({ type = "comment" }: PostProps) => {
  // const fileDetails = await getFileDetails("675d943be375273f6003858f");
  const fileDetails = mockFileDetails; // Mock verwenden

  const isStatus = type === "status";
  const avatar =
    <Avatar
      sx={{ width: 40, height: 40, overflow: "hidden" }}
      alt={`${mockPost.author.name} avatar`}
    >
      <Image path={mockPost.author.avatarPath} alt="avatar" w={100} h={100} tr />
    </Avatar>;

  return (
    <Box sx={{ p: 2, borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
      {/* POST TYPE */}
      <Stack direction="row" alignItems="center" gap={1} mb={1}>
        <RepeatIcon fontSize="small" sx={{ color: "text.secondary" }} />
        <Typography variant="body2" color="text.secondary">
          {mockPost.repostedBy} reposted
        </Typography>
      </Stack>

      {/* POST CONTENT */}
      <Stack direction={isStatus ? "column" : "row"} gap={2}>
        {/* AVATAR (links) */}
        {!isStatus && (
          <Box sx={{ width: 40, height: 40 }}>{avatar}</Box>
        )}

        {/* CONTENT */}
        <Stack flex={1} gap={1}>
          {/* TOP */}
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Link href={`/lamaWebDev`} style={{ textDecoration: "none", color: "inherit" }}>
              <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
                {isStatus && <Box sx={{ width: 40, height: 40 }}>{avatar}</Box>}
                <Stack
                  direction={isStatus ? "column" : "row"}
                  alignItems={isStatus ? "flex-start" : "center"}
                  gap={isStatus ? 0 : 1}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    {mockPost.author.name}
                  </Typography>
                  <Typography
                    variant={isStatus ? "body2" : "body2"}
                    color="text.secondary"
                  >
                    {mockPost.author.handle}
                  </Typography>
                  {!isStatus && (
                    <Typography variant="body2" color="text.secondary">
                      {mockPost.createdFromNow}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Link>
            <PostInfo />
          </Stack>

          {/* TEXT & MEDIA */}
          <Link href={`/lamaWebDev/status/123`} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant={isStatus ? "h6" : "body1"}>
              {mockPost.text}
            </Typography>
          </Link>

          {/* MEDIA (Bild oder Video) */}
          {fileDetails.fileType === "image" ? (
            <Box
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                filter: fileDetails.customMetadata?.sensitive ? "blur(8px)" : "none",
                maxWidth: "100%",
                width: "100%",
              }}
            >
              <Image
                path={fileDetails.filePath}
                alt="post media"
                w={fileDetails.width}
                h={fileDetails.height}
                tr
                sx={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                filter: fileDetails.customMetadata?.sensitive ? "blur(8px)" : "none",
              }}
            >
              <Video path={fileDetails.filePath} />
            </Box>
          )}

          {isStatus && (
            <Typography variant="body2" color="text.secondary">
              {mockPost.createdAtAbs}
            </Typography>
          )}

          <PostInteractions {...mockPost.interactions} />
        </Stack>
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default Post;
