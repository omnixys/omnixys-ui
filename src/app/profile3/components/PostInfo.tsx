// components/PostInfo.tsx
import { Box, IconButton, Tooltip } from "@mui/material";
import Image from "./Image";

const PostInfo = () => {
  return (
    <Tooltip title="Weitere Informationen">
      <IconButton
        size="small"
        sx={{
          width: 16,
          height: 16,
          padding: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
          }}
        >
          <Image path="icons/infoMore.svg" alt="Info Icon" w={16} h={16} />
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default PostInfo;
