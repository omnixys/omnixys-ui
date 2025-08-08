import { GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import {
  Card,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

type SocialLinks = {
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
};

export default function ProfileSocialLinksCard({
  socialLinks,
}: {
  socialLinks?: SocialLinks;
}) {
  if (!socialLinks) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🌐 Social Links
      </Typography>
      <Stack direction="row" spacing={2}>
        {socialLinks.linkedIn && (
          <Tooltip title="LinkedIn">
            <IconButton
              component={Link}
              href={socialLinks.linkedIn}
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          </Tooltip>
        )}
        {socialLinks.twitter && (
          <Tooltip title="Twitter">
            <IconButton
              component={Link}
              href={socialLinks.twitter}
              target="_blank"
            >
              <Twitter />
            </IconButton>
          </Tooltip>
        )}
        {socialLinks.instagram && (
          <Tooltip title="Instagram">
            <IconButton
              component={Link}
              href={socialLinks.instagram}
              target="_blank"
            >
              <Instagram />
            </IconButton>
          </Tooltip>
        )}
        {socialLinks.github && (
          <Tooltip title="GitHub">
            <IconButton
              component={Link}
              href={socialLinks.github}
              target="_blank"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Card>
  );
}
