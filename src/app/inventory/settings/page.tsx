// src/app/settings/page.tsx
"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  TextField,
} from "@mui/material";
import Header from "../components/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

export default function Settings() {
  const [userSettings, setUserSettings] = React.useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    setUserSettings((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], value: !(copy[index].value as boolean) };
      return copy;
    });
  };

  const handleTextChange = (index: number, v: string) => {
    setUserSettings((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], value: v };
      return copy;
    });
  };

  return (
    <Box>
      <Header name="User Settings" />

      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="overline" color="text.secondary">
                    Setting
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="overline" color="text.secondary">
                    Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userSettings.map((setting, index) => (
                <TableRow hover key={setting.label}>
                  <TableCell sx={{ width: 280 }}>
                    <Typography variant="body2">{setting.label}</Typography>
                  </TableCell>
                  <TableCell>
                    {setting.type === "toggle" ? (
                      <Switch
                        checked={Boolean(setting.value)}
                        onChange={() => handleToggleChange(index)}
                        color="primary"
                      />
                    ) : (
                      <TextField
                        size="small"
                        value={String(setting.value)}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                        fullWidth
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
