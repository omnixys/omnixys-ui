"use client";

import { useState } from "react";
import Feed from "./components/Feed";
import Share from "./components/Share";
import { Tabs, Tab, Box } from "@mui/material";

const tabData = [
  { label: "For you", value: "for-you" },
  { label: "Following", value: "following" },
  { label: "React.js", value: "react" },
  { label: "JavaScript", value: "javascript" },
  { label: "CSS", value: "css" },
];

export default function Homepage() {
  const [selectedTab, setSelectedTab] = useState("for-you");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {tabData.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            sx={{ fontWeight: "bold" }}
          />
        ))}
      </Tabs>

      Share Post
      <Box sx={{ p: 2 }}>
        <Share />
      </Box>

      {/* Feed */}
      <Box sx={{ p: 2 }}>
        <Feed />
      </Box>
    </Box>
  );
}
