type FollowCount = {
  followers: number;
  following: number;
};

export type Profile = {
  id: string;
  username: string;
  info: Info;
  settings: Settings;
};

type Info = {
  bio: string | null;
  profileImage: string | null;
};

type Settings = {
  isSuspended: boolean;
  suspendedUntil: string | null;
  language: 'de' | 'en' | 'fr';
  colorMode: 'light' | 'dark' | 'system';
  colorScheme: 'original' | 'red' | 'green' | 'yellow' | 'blue';
  showWelcomeScreen: boolean;
  blockedUsers: BlockedUser[];
};

type BlockedUser = {
  blockedId: string;
  blockedUsername: string;
  blockedAt: string;
  reason: string;
};

export type FullProfile = {
  profile: Profile;
  followCount: FollowCount;
  friendships: number;
};
