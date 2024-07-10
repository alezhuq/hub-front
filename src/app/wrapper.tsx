"use client";
import { SnackbarProvider } from "notistack";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
