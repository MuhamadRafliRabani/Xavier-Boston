// components/SmoothScroll.tsx
"use client";

import { useEffect, useRef } from "react";
import ReactLenis, { LenisRef } from "lenis/react";
import gsap from "gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      if (!lenisRef.current?.lenis) return;

      lenisRef.current.lenis.raf(time * 1200);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
