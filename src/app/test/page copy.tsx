// app/person/page.tsx (Server Component with SSR)
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { redirect } from "next/navigation";
import PersonManagementClient from "./PersonManagementClient";
import { Box, Button, Typography } from "@mui/material";
import MotionSection from "../../components/common/MotionSection";
import MotionCard from "../../components/common/MotionCard";
import MotionImage from "../../components/common/MotionImage";
import { useMotion } from "../../components/common/MotionProvider";

export default async function PersonManagementPage() {
  const { animationsEnabled, toggleAnimations } = useMotion();
  
  const session = await getServerSession(authOptions);

  if (!session || !session.access_token) return redirect("/login");

  const roles = session.user.roles || [];
  const isAdminOrManager = roles.includes("Admin") || roles.includes("Manager");

  if (!isAdminOrManager) return redirect("/unauthorized");


  return (
    <Box>
      {/* <PersonManagementClient roles={roles} token={session.access_token} /> */}
      <Button onClick={toggleAnimations}>
        {animationsEnabled
          ? "Animationen deaktivieren"
          : "Animationen aktivieren"}
      </Button>
      <MotionSection delay={0.3} direction="up">
        <Typography variant="h4">Unsere Features</Typography>
        <Typography variant="body1">
          Hier findest du die besten Module...
        </Typography>
      </MotionSection>
      {/* // Beispiel Card */}
      <MotionCard delay={0.2}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="h6">Modularität</Typography>
          <Typography variant="body2">
            Jeder Service unabhängig deploybar
          </Typography>
        </Box>
      </MotionCard>
      {/* // Beispiel Bild */}
      <MotionImage
        src="/omnixys-logo.png"
        alt="Logo"
        width={120}
        height={120}
        delay={0.3}
        direction="down"
      />
    </Box>
  );
}