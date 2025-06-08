"use client";

import Link from "next/link";
import gsap from "gsap";
import { RefObject, useRef } from "react";
import { ArrowDownRight } from "react-feather";
import SocialMedia from "./social-media";

export default function Footer() {
  const joinRef = useRef(null);
  const contactRef = useRef(null);

  const handleHover = (ref: RefObject<null>) => {
    if (!ref.current) return;

    //@ts-ignore
    const [arrow1, arrow2] = ref.current.querySelectorAll(".arrow");

    gsap.to(arrow2, {
      y: "40px",
      x: "16px",
      duration: 0.3,
      ease: "back.inOut",
    });

    gsap.to(arrow1, {
      y: "30px",
      x: "16px",
      duration: 0.3,
      ease: "back.inOut",
    });
  };

  const handleLeave = (ref: RefObject<null>) => {
    if (!ref.current) return;

    //@ts-ignore
    const [arrow1, arrow2] = ref.current.querySelectorAll(".arrow");

    gsap.to(arrow2, {
      y: "0px",
      x: "0px",
      duration: 0.3,
      ease: "back.inOut",
    });

    gsap.to(arrow1, {
      y: "-30px",
      x: "-16px",
      duration: 0.3,
      ease: "back.inOut",
    });
  };

  return (
    <footer className="bg-[#ebfa9e] text-secondary px-6 w-[98%] m-auto md:px-16 py-12 rounded-t-3xl md:max-h-[210px]">
      <div className="flex flex-col md:flex-row justify-between  items-start gap-8">
        {/* Kiri */}
        <div className="md:basis-[15%]">
          <h1 className="text-2xl font-bold mb-4">
            Xavier Botton<span className="align-super text-xs">®</span>
          </h1>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-white transition">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Legal notice
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Kanan */}
        <div className="md:basis-[85%] flex flex-col items-end min-h-[145px] justify-between">
          <div className="flex gap-4">
            <Link
              href="#"
              ref={joinRef}
              onMouseEnter={() => handleHover(joinRef)}
              onMouseLeave={() => handleLeave(joinRef)}
              className="border border-white rounded-full px-4 py-3 overflow-hidden text-sm hover:bg-white hover:text-black transition"
            >
              <p className="flex items-center justify-center gap-0.5 ">
                Join the team
                <span className="arrow">
                  <ArrowDownRight className="size-5 -translate-y-[30px] -translate-x-2" />
                </span>
                <span className="arrow">
                  <ArrowDownRight className="size-5 -translate-x-2 " />
                </span>
              </p>
            </Link>

            <Link
              href="#"
              ref={contactRef}
              onMouseEnter={() => handleHover(contactRef)}
              onMouseLeave={() => handleLeave(contactRef)}
              className="bg-white text-black rounded-full px-4 py-3 overflow-hidden text-sm font-medium hover:bg-gray-200 transition"
            >
              <p className="flex items-center justify-center gap-0.5">
                Contact us
                <span className="arrow">
                  <ArrowDownRight className="size-5 -translate-y-[30px] -translate-x-2" />
                </span>
                <span className="arrow">
                  <ArrowDownRight className="size-5 -translate-x-2 " />
                </span>
              </p>
            </Link>
          </div>

          <SocialMedia />
        </div>
      </div>
    </footer>
  );
}
