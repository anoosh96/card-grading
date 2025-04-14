import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { Lato } from "next/font/google";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SnackbarProvider } from 'notistack'
import ClientProvider from "@/providers/ClientProvider";

const lato = Lato({ weight: ["100", "300", "400", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `Precision Grading - AI-Driven Precision Grading for Pokémon Cards`,
    template: `%s | Precision Grading`,
  },
  description: "AI-Driven Precision Grading for Pokémon Cards. Accurate, fast, and transparent AI card grading—trusted by collectors worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lato.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
