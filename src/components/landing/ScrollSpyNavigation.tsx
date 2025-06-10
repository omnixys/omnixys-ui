import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Start" },
  { id: "USPGrid", label: "Vorteile" },
  { id: "video", label: "Video" },
  { id: "kpis", label: "KPIs" },
  { id: "progress", label: "Fortschritt" },
  { id: "badges", label: "Badges" },
  { id: "progress", label: "Fortschritt" },
  { id: "timeline", label: "Features" },
  { id: "vergleich", label: "Vergleich" },
  { id: "newsletter", label: "Newsletter" },
  { id: "blog", label: "Blog" },
  { id: "testimony", label: "Zeugnid" },
];

export default function ScrollSpyNavigation() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top >= 0 && top <= window.innerHeight / 2) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        right: 16,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 2,
        zIndex: 1200,
        backdropFilter: "blur(8px)",
        p: 1,
      }}
    >
      <List dense>
        {sections.map((section) => (
          <ListItemButton
            key={section.id}
            onClick={() =>
              document
                .getElementById(section.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            selected={activeId === section.id}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText
              primary={section.label}
              primaryTypographyProps={{
                fontSize: "0.75rem",
                color: activeId === section.id ? "primary.main" : "white",
                textAlign: "center",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
