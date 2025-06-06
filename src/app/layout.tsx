import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import SmoothScroll from "./libs/smooth-scroll";

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
      <ReactLenis root>
        <SmoothScroll>
          <body className={`antialiased text-[var(--secondary)]`}>
            {children}
          </body>
        </SmoothScroll>
      </ReactLenis>
    </html>
  );
}
