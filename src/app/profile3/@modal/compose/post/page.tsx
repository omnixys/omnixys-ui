// components/PostModal.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Box,
  TextField,
  Button,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "../../../components/Image";

const PostModal: React.FC = () => {
  const router = useRouter();
  const closeModal = () => router.back();

  // Bonus: einfacher File-Picker (optional)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <Dialog
      open
      onClose={closeModal}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          borderRadius: 2,
        },
      }}
      BackdropProps={{ sx: { backgroundColor: "#293139a6" } }}
    >
      {/* TOP */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} pt={2}>
        <Tooltip title="Close">
          <IconButton onClick={closeModal} size="small" aria-label="Close post modal">
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" fontWeight={700} color="primary">
          Drafts
        </Typography>
      </Stack>

      <DialogContent sx={{ pt: 1 }}>
        {/* CENTER */}
        <Stack direction="row" spacing={2} py={2}>
          <Box
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image path="general/avatar.png" alt="Lama Dev" w={100} h={100} tr />
          </Box>
          <TextField
            placeholder="What is happening?!"
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true }}
            sx={{ "& input": { fontSize: 18 } }}
          />
        </Stack>

        {/* BOTTOM */}
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
          pt={2}
        >
          <Stack direction="row" gap={1.5} alignItems="center" flexWrap="wrap">
            {/* hidden file input (optional) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // TODO: Datei in deinen Share-Flow geben
                  console.log("selected file:", file);
                }
              }}
            />

            {[
              { icon: "image.svg", onClick: openFilePicker, label: "Upload" },
              { icon: "gif.svg", label: "GIF" },
              { icon: "poll.svg", label: "Poll" },
              { icon: "emoji.svg", label: "Emoji" },
              { icon: "schedule.svg", label: "Schedule" },
              { icon: "location.svg", label: "Location" },
            ].map(({ icon, onClick, label }) => (
              <Tooltip key={icon} title={label}>
                <IconButton size="small" onClick={onClick}>
                  <Image path={`icons/${icon}`} alt={label} w={20} h={20} />
                </IconButton>
              </Tooltip>
            ))}
          </Stack>

          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "common.white",
              color: "common.black",
              fontWeight: 700,
              borderRadius: "9999px",
              px: 2.5,
              "&:hover": { bgcolor: "grey.200" },
            }}
            onClick={closeModal}
          >
            Post
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
