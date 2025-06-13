// src/context/SettingsContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";
import { OmnixysColorScheme } from "@/theme/theme";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE } from "@/graphql/profile/mutation/update";
import { MY_PROFILE } from "@/graphql/profile/query/profile";
import getApolloClient from "@/lib/apolloClient";
import { getLogger } from "../utils/logger";

export type Settings = {
  language: string;
  compactLayout: boolean;
  colorMode: PaletteMode;
  colorScheme: OmnixysColorScheme;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  loading: boolean;
};

const defaultSettings: Settings = {
  language: "de",
  compactLayout: false,
  colorMode: "light",
  colorScheme: "original",
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  loading: true,
});

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
     const logger = getLogger(SettingsProvider.name);
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading } = useQuery(MY_PROFILE, { client });
  logger.debug(data);

  const [updateProfile] = useMutation(UPDATE_PROFILE, { client });

  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    if (data?.myProfile) {
      setSettings({
        language: data.myProfile.language ?? "de",
        colorMode: data.myProfile.colorMode ?? "light",
        colorScheme: data.myProfile.colorScheme ?? "original",
        compactLayout: !data.myProfile.showWelcomeScreen,
      });
    }
  }, [data]);

  const updateSettings = (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    updateProfile({
      variables: {
        input: {
          language: newSettings.language,
          colorMode: newSettings.colorMode,
          colorScheme: newSettings.colorScheme,
          showWelcomeScreen: !newSettings.compactLayout,
        },
      },
    }).catch(console.error);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}
