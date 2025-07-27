"use client";

import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";

const tabContent = [
  {
    label: "Beiträge",
    content: (
      <>
        <PostCard
          title="Neues Feature in OmnixysSphere"
          content="Wir haben gerade die Analytics-Integration veröffentlicht! 🚀"
          image="/images/post1.jpg"
        />
        <PostCard
          title="GraphQL rocks!"
          content="API-First Entwicklung mit GraphQL ist ein Game-Changer."
        />
      </>
    ),
  },
  { label: "Über mich", content: <Box>Über mich Inhalt...</Box> },
  { label: "Projekte", content: <Box>Projektliste...</Box> },
  { label: "Netzwerk", content: <Box>Netzwerk anzeigen...</Box> },
];

export default function ProfileTabs() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabContent.map((t, i) => (
          <Tab key={i} label={t.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3, minHeight: 200 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {tabContent[tab].content}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
