import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import TanStackProvider from "@/components/providers/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Now Abhinav Sharma",
  description: "",
  icons: {
    icon: [
      { rel: "apple-touch-icon", sizes: "76x76", url: "/apple-touch-icon.png" },
      { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
  },
  // themeColor: "#ffffff",
  // other: {
  //   "msapplication-TileColor": "#da532c",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanStackProvider>
            {children}
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
