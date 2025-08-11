// types/social.ts
export interface UserLite {
    id: string;
    username?: string | null;
    name?: string | null;
    surname?: string | null;
    avatar?: string | null;
  }

  export interface CommentLite {
    id: string | number;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    postId: number;
    user: UserLite;
  }
