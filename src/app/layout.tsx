import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { ContextManagerProvider } from "../context/ContextManager";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Next Admin Dashboard",
  description: "A modern admin dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          <NotificationProvider>
            <UserPreferencesProvider>
              <ContextManagerProvider>
                {children}
              </ContextManagerProvider>
            </UserPreferencesProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
