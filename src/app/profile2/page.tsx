// app/(home)/Homepage.tsx
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AddPost from './components/AddPost';
import Stories from './components/Stories';
import Feed from './components/feed/Feed';
import LeftMenu from './components/leftMenu/LeftMenu';
import RightMenu from './components/rightMenu/RightMenu';

export default function Homepage() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        pt: 2,
        gridTemplateColumns: {
          xs: '1fr',              // mobile: nur Mitte
          lg: '7fr 3fr',          // ab lg: Mitte + rechts
          xl: '2fr 5fr 3fr',      // ab xl: links + Mitte + rechts
        },
      }}
    >
      {/* Left column (nur xl+) */}
      <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
        <LeftMenu type="home" />
      </Box>

      {/* Center column */}
      <Box>
        <Stack spacing={2}>
          <Stories />
          <AddPost />
          <Feed />
        </Stack>
      </Box>

      {/* Right column (ab lg) */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <RightMenu />
      </Box>
    </Box>
  );
}
