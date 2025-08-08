type FollowCount = {
  followers: number;
  following: number;
};

export type ProfileType = {
  id: string;
  username: string;
  info: InfoType;
  settings: SettingsType;
};

export type InfoType = {
  bio: string | null;
  profileImage?: string;
  headline?: string;
  location?: string;
  coverImage?: string;
  kurzprofil?: string;
  ausbildung?: {
    abschluss: string;
    in: string;
    wo: string;
  }[];
  berufserfahrung?: {
    wo?: string;
    als: string;
    beschreibung: string;
    von: string;
    bis: string;
  }[];
  kenntnisse?: string[];
  sprachen?: string[];
  socialLinks?: {
    linkedIn?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
};

type SettingsType = {
  isSuspended: boolean;
  suspendedUntil: string | null;
  language: 'de' | 'en' | 'fr';
  colorMode: 'light' | 'dark' | 'system';
  colorScheme: 'original' | 'red' | 'green' | 'yellow' | 'blue';
  showWelcomeScreen: boolean;
  blockedUsers: BlockedUserType[];
};

type BlockedUserType = {
  blockedId: string;
  blockedUsername: string;
  blockedAt: string;
  reason: string;
};

export type FullProfileType = {
  profile: ProfileType;
  followCount: FollowCount;
  friendships: number;
};

export type UpdateProfileType = {
  info: InfoType;
  settings: SettingsType;
};
