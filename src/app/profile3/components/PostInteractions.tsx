// components/PostInteractions.tsx
"use client";

import * as React from "react";
import { Box, Stack, IconButton, Tooltip, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IosShareIcon from "@mui/icons-material/IosShare";

type PostInteractionsProps = {
  comments?: number;
  reposts?: number;
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onCommentClick?: () => void;
  onRepostClick?: () => void;
  onLikeClick?: () => void;
  onBookmarkClick?: () => void;
  onShareClick?: () => void;
  sx?: any;
};

const hoverPair = (colorToken: string) => ({
  "&:hover": {
    "& .pi-icon, & .pi-count": {
      color: colorToken,
    },
  },
});

const PostInteractions: React.FC<PostInteractionsProps> = ({
  comments = 0,
  reposts = 0,
  likes = 0,
  isLiked = false,
  isBookmarked = false,
  onCommentClick,
  onRepostClick,
  onLikeClick,
  onBookmarkClick,
  onShareClick,
  sx,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={{ xs: 1, lg: 4 }}
      my={1}
      sx={{ color: "text.secondary", ...sx }}
    >
      {/* left group */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" flex={1} gap={2}>
        {/* COMMENTS */}
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, cursor: "pointer", ...hoverPair("primary.main") }}>
          <Tooltip title="Kommentare">
            <IconButton size="small" onClick={onCommentClick}>
              <ChatBubbleOutlineIcon fontSize="small" className="pi-icon" />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" className="pi-count">
            {comments}
          </Typography>
        </Box>

        {/* REPOST */}
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, cursor: "pointer", ...hoverPair("success.main") }}>
          <Tooltip title="Reposten">
            <IconButton size="small" onClick={onRepostClick}>
              <RepeatIcon fontSize="small" className="pi-icon" />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" className="pi-count">
            {reposts}
          </Typography>
        </Box>

        {/* LIKE */}
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, cursor: "pointer", ...hoverPair("secondary.main") }}>
          <Tooltip title={isLiked ? "Gefällt mir nicht mehr" : "Gefällt mir"}>
            <IconButton size="small" onClick={onLikeClick}>
              {isLiked ? (
                <FavoriteIcon fontSize="small" className="pi-icon" />
              ) : (
                <FavoriteBorderIcon fontSize="small" className="pi-icon" />
              )}
            </IconButton>
          </Tooltip>
          <Typography variant="body2" className="pi-count">
            {likes}
          </Typography>
        </Box>
      </Stack>

      {/* right group */}
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Tooltip title={isBookmarked ? "Lesezeichen entfernen" : "Als Lesezeichen speichern"}>
          <IconButton size="small" onClick={onBookmarkClick} sx={hoverPair("primary.main")}>
            {isBookmarked ? (
              <BookmarkIcon fontSize="small" className="pi-icon" />
            ) : (
              <BookmarkBorderIcon fontSize="small" className="pi-icon" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Teilen">
          <IconButton size="small" onClick={onShareClick} sx={hoverPair("primary.main")}>
            <IosShareIcon fontSize="small" className="pi-icon" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default PostInteractions;
