// src/lib/updateUser.ts
'use server';

import { z } from 'zod';
import { updateUserRecord } from './db';

const schema = z.object({
  id: z.string().min(1),
  username: z.string().trim().min(1).optional().or(z.literal('')),
  firstName: z.string().trim().optional().or(z.literal('')),
  lastName: z.string().trim().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().trim().optional().or(z.literal('')),
});

export async function updateUser(formData: FormData) {
  const raw = {
    id: String(formData.get('id') || ''),
    username: (formData.get('username') as string) ?? '',
    firstName: (formData.get('firstName') as string) ?? '',
    lastName: (formData.get('lastName') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    phone: (formData.get('phone') as string) ?? '',
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten() };
  }

  const { id, username, firstName, lastName, email, phone } = parsed.data;

  // leere Strings als undefined behandeln
  const patch = {
    username: username || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email: email || undefined,
    phone: phone || undefined,
  };

  const updated = updateUserRecord(id, patch);
  if (!updated) {
    return { ok: false, error: { formErrors: ['User not found'] } };
  }

  return { ok: true, user: updated };
}
