'use client';

import { useState } from 'react';
import { deletePost } from '../../lib/actions';

// MUI
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function PostInfo({ postId }: { postId: number }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Server Action vormerken (wie im Original mit bind)
  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <>
      <IconButton
        aria-label="more"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled>
          <ListItemIcon>
            <VisibilityOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>

        <MenuItem disabled>
          <ListItemIcon>
            <RepeatOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Re-post" />
        </MenuItem>

        <Divider />

        {/* Delete via Server Action (Form-Submit) */}
        <MenuItem>
          <form
            action={async () => {
              await deletePostWithId();
              setAnchorEl(null);
            }}
            style={{ display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: 'var(--mui-palette-error-main, #d32f2f)',
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
              <span>Delete</span>
            </button>
          </form>
        </MenuItem>
      </Menu>
    </>
  );
}
