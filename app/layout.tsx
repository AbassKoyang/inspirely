import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/contexts/authContext";
import Script from 'next/script';
import QueryProvider from "@/components/tanstackConfig";
import SideBar from "@/components/SideBar";
import { SidebarProvider, useSideBarActive } from "@/lib/contexts/sidebardContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inspirely - Ideas worth sharing",
  description: "Discover stories, insights, and perspectives from writers around the world. Join a community where meaningful ideas flourish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <SidebarProvider>
              <main className="w-full min-h-dvh relative">
              <Navbar />
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <Footer />
              <Toaster />
              </main>
          </ SidebarProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
