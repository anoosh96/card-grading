'use client'

import { ReactNode } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./theme-provider";
import { SnackbarProvider } from "notistack";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}