'use client'

import { ReactNode, useEffect } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./theme-provider";
import { SnackbarProvider } from "notistack";
import { registerStoreClearFunction } from "@/lib/axiosClient";
import { useUserStore } from "@/stores/userStore";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    registerStoreClearFunction(clearUser);
  }, [])

  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}