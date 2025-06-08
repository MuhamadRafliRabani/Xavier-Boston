import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("./libs/smooth-scroll"));

export const metadata: Metadata = {
  title: "Xavier Boston - Content Creator",
  description: "Portfolio of Xavier Boston, digital storyteller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-[var(--secondary)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
