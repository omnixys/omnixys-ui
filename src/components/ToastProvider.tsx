// components/ToastProvider.tsx
'use client';
import { SnackbarProvider } from 'notistack';

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
