"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { Zap } from "react-feather";

gsap.registerPlugin(SplitText);

const Header = () => {
  const name = useRef<HTMLHeadingElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const wraperH1 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!name.current || !headerRef.current || !wraperH1.current) return;

    const split = SplitText.create(name.current, { type: "lines" });
    const fadeItem = gsap.utils.toArray(".item");

    if (!split) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 640px)",
        isTablet: "(min-width: 641px) and (max-width: 1024px)",
        isDesktop: "(min-width: 1025px)",
      },
      (context) => {
        // @ts-ignore
        const { isMobile, isTablet, isDesktop } = context.conditions;

        const tl = gsap.timeline();

        // Animasi Mobile
        if (isMobile) {
          tl.to(split.lines, {
            y: "-200px",
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          })
            .to(
              wraperH1.current,
              { scale: 0.9, duration: 0.4, ease: "power2.inOut" },
              "+=0.1"
            )
            .to(
              headerRef.current,
              { height: "120px", duration: 0.4, ease: "power2.inOut" },
              "+=0.1"
            )
            .to(
              fadeItem,
              {
                y: "-5px",
                x: "-5px",
                opacity: 1,
                duration: 0.6,
                ease: "sine.inOut",
                stagger: 0.08,
              },
              ">"
            );
        }

        // Animasi Tablet
        if (isTablet) {
          tl.to(split.lines, {
            y: "-150px",
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          })
            .to(
              wraperH1.current,
              { scale: 0.95, duration: 0.5, ease: "power2.inOut" },
              "+=0.12"
            )
            .to(
              headerRef.current,
              { height: "150px", duration: 0.45, ease: "power2.inOut" },
              "+=0.12"
            )
            .to(
              fadeItem,
              {
                y: "-3px",
                opacity: 1,
                duration: 0.7,
                ease: "sine.inOut",
                stagger: 0.09,
              },
              ">"
            );
        }

        // Animasi Desktop (versi yang kamu buat tadi)
        if (isDesktop) {
          tl.to(split.lines, {
            y: "-200px",
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.inOut",
          })
            .to(
              wraperH1.current,
              { scale: 1, duration: 0.6, ease: "power3.inOut" },
              "+=0.15"
            )
            .to(
              headerRef.current,
              { height: "180px", duration: 0.5, ease: "power2.inOut" },
              "+=0.15"
            )
            .to(
              fadeItem,
              {
                y: "-4px",
                opacity: 1,
                duration: 0.3,
                ease: "power3.inOut",
                stagger: 0.1,
              },
              "<=0.1"
            );
        }

        tl.add(() => {
          ScrollTrigger.refresh();
        });
      }
    );

    return () => {
      split.revert();
      mm.revert();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full space-y-1 text-center overflow-hidden h-screen grid place-content-center"
    >
      <div ref={wraperH1} className="overflow-hidden scale-50 md:scale-15">
        <h1
          ref={name}
          style={{ transform: "translateY(200px)" }}
          className="text-[2.7em]/[1.2em] md:text-[10.35em]/[0.9em] font-extrabold whitespace-nowrap bg-yellow-500"
        >
          XAVIER BOSTON
        </h1>
      </div>

      <div className="item flex justify-between items-center md:gap-0 font-bold md:text-[1.45em]/[1.4em] w-full text-sm gap-4">
        <p className="max-w-40 md:max-w-full md:-ms-4">
          Content Creation & Digital Storytelling
        </p>
        <Zap className="fill-[#171717]" />
        <p className="font-light italic md:me-10">
          Scaling brands reach and impact
        </p>
      </div>
    </header>
  );
};

export default Header;
