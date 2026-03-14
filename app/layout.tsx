// frontend/app/layout.tsx
import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multiplium Research Lab",
  description: "Regenerative Viticulture Investment Intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Chivo:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light text-text-main min-h-screen antialiased font-sans">
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
