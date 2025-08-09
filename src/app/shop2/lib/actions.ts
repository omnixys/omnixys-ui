// src/lib/db.ts
export type User = {
  id: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
};

const users = new Map<string, User>();

// Demo-Datensatz
users.set('u_1', {
  id: 'u_1',
  username: 'lama',
  firstName: 'Lama',
  lastName: 'Dev',
  email: 'lama@example.com',
  phone: '+1 234 567 890',
});

export function getUser(id: string) {
  return users.get(id) ?? null;
}

export function updateUserRecord(id: string, patch: Partial<User>) {
  const existing = users.get(id);
  if (!existing) return null;
  const updated: User = { ...existing, ...patch };
  users.set(id, updated);
  return updated;
}
