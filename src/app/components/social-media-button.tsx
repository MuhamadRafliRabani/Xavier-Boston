"use client";
import gsap from "gsap";
import { useRef } from "react";

type Props = {
  label: string;
  videoUrl: string;
};

const SocialButton = ({ label, videoUrl }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      opacity: 1,
      y: -20,
      duration: 0.4,
      ease: "power3.out",
      display: "block",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      opacity: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        if (!cardRef.current) return;

        cardRef.current.style.display = "none";
      },
    });
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=""
      >
        <span className="font-medium">{label}</span>
      </button>

      <div
        ref={cardRef}
        className="absolute left-1/2 -translate-x-1/2 -top-50 w-66 p-2  bg-transparent backdrop-blur-3xl shadow-lg rounded-lg overflow-hidden opacity-0 hidden"
      >
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="w-full h-40 object-cover"
        />
      </div>
    </div>
  );
};

export default SocialButton;
