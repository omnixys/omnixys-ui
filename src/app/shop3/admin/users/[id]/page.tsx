"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Breadcrumbs,
  Link as MUILink,
  Avatar,
  Tooltip,
  IconButton,
  LinearProgress,
  Button,
  Divider,
  Drawer,
  Paper,
} from "@mui/material";

// MUI Icons statt lucide
import VerifiedIcon from "@mui/icons-material/Verified";
import ShieldIcon from "@mui/icons-material/Shield";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import EditUser from "../../components/EditUser"; // bitte sicherstellen: MUI-only Version
import AppLineChart from "../../components/AppLineChart"; // ok, wenn ohne tailwind/shadcn

const SingleUserPage: React.FC = () => {
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <MUILink component={Link} href="/" underline="hover" color="inherit">
            Dashboard
          </MUILink>
          <MUILink component={Link} href="/users" underline="hover" color="inherit">
            Users
          </MUILink>
          <Typography color="text.primary">John Doe</Typography>
        </Breadcrumbs>
      </Box>

      {/* Container */}
      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid item xs={12} xl={4}>
          {/* User Badges */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                User Badges
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
                <Tooltip
                  title={
                    <Box>
                      <Typography fontWeight={700} mb={0.5}>Verified User</Typography>
                      <Typography variant="body2" color="text.secondary">
                        This user has been verified by the admin.
                      </Typography>
                    </Box>
                  }
                  arrow
                  placement="top"
                >
                  <IconButton
                    size="medium"
                    sx={{
                      bgcolor: "rgba(33,150,243,0.15)", // blue 500 ~
                      border: "1px solid rgba(33,150,243,0.35)",
                      p: 1,
                      borderRadius: "50%",
                    }}
                  >
                    <VerifiedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    <Box>
                      <Typography fontWeight={700} mb={0.5}>Admin</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Admin users have access to all features and can manage users.
                      </Typography>
                    </Box>
                  }
                  arrow
                  placement="top"
                >
                  <IconButton
                    size="medium"
                    sx={{
                      bgcolor: "rgba(46,125,50,0.15)", // green 800 ~
                      border: "1px solid rgba(46,125,50,0.35)",
                      p: 1,
                      borderRadius: "50%",
                    }}
                  >
                    <ShieldIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    <Box>
                      <Typography fontWeight={700} mb={0.5}>Awarded</Typography>
                      <Typography variant="body2" color="text.secondary">
                        This user has been awarded for their contributions.
                      </Typography>
                    </Box>
                  }
                  arrow
                  placement="top"
                >
                  <IconButton
                    size="medium"
                    sx={{
                      bgcolor: "rgba(253,216,53,0.2)", // yellow 500 ~
                      border: "1px solid rgba(253,216,53,0.45)",
                      p: 1,
                      borderRadius: "50%",
                    }}
                  >
                    <EmojiEventsIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    <Box>
                      <Typography fontWeight={700} mb={0.5}>Popular</Typography>
                      <Typography variant="body2" color="text.secondary">
                        This user has been popular in the community.
                      </Typography>
                    </Box>
                  }
                  arrow
                  placement="top"
                >
                  <IconButton
                    size="medium"
                    sx={{
                      bgcolor: "rgba(255,152,0,0.2)", // orange 500 ~
                      border: "1px solid rgba(255,152,0,0.45)",
                      p: 1,
                      borderRadius: "50%",
                    }}
                  >
                    <WhatshotIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>

          {/* User Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                <Avatar
                  src="https://avatars.githubusercontent.com/u/1486366"
                  alt="John Doe"
                  sx={{ width: 48, height: 48 }}
                >
                  JD
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  John Doe
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptas
                distinctio ab ipsa commodi fugiat labore quos veritatis cum corrupti sed
                repudiandae ipsum, harum recusandae ratione ipsam in, quis quia.
              </Typography>
            </CardContent>
          </Card>

          {/* Information */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight={600}>
                  User Information
                </Typography>
                <Button variant="contained" onClick={() => setOpenEdit(true)}>
                  Edit User
                </Button>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Profile completion
                </Typography>
                <LinearProgress variant="determinate" value={66} sx={{ borderRadius: 1 }} />
              </Box>

              <Box sx={{ display: "grid", gap: 1.5, mt: 3 }}>
                <InfoRow label="Full name" value="John Doe" />
                <InfoRow label="Email" value="john.doe@gmail.com" />
                <InfoRow label="Phone" value="+1 234 5678" />
                <InfoRow label="Address" value="123 Main St" />
                <InfoRow label="City" value="New York" />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                Joined on 2025.01.01
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} xl={8}>
          {/* Chart */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                User Activity
              </Typography>
              <AppLineChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Drawer (statt Radix Sheet) */}
      <Drawer
        anchor="right"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        PaperProps={{ sx: { width: { xs: 360, sm: 420 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            Edit User
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {/* Stelle sicher: EditUser nutzt MUI-Form-Komponenten */}
          <EditUser />
        </Box>
      </Drawer>
    </Box>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" fontWeight={700}>
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

export default SingleUserPage;
