"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  const about = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const hr = useRef<HTMLHRElement | null>(null); // kasih tipe ref-nya biar aman

  useEffect(() => {
    if (!about.current) return;
    if (!container.current) return;
    if (!hr.current) return;

    const images = gsap.utils
      .toArray<HTMLElement>(".images")
      .slice(1)
      .reverse() as HTMLElement[];

    const split = SplitText.create(".about", { type: "words" });

    gsap.from(split.words, {
      y: "128px",
      stagger: 0.08,
      ease: "power2.out",
      duration: 0.9,
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        toggleActions: "play none none none",
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: about.current,
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
      },
    });

    gsap.to(hr.current, {
      width: "100%",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(
      images,
      {
        height: "0%",
        stagger: 0.5, // kasih jarak antar image animasi
        ease: "power2.inOut",
      },
      0 // mulai di detik ke-0 bareng text color
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="">
      <hr ref={hr} className="hr" />
      <div
        ref={about}
        className="min-h-screen flex md:flex-row flex-col w-full bg-muted gap-8 justify-start md:items-center"
      >
        <div
          ref={container}
          className="w-full md:w-[45%] h-[40vh] md:h-[90vh] pt-8 md:pt-15"
        >
          <span className="text-sm w-fit whitespace-nowrap  text-[#fff3e3]">
            `(about Xavier)
          </span>
          <div className="overflow-hidden text-6xl font-medium">
            <span className="about text-secondary text-pretty">
              Driven by curiosity, powered by creativity —
            </span>
          </div>
        </div>
        <div className="w-full md:w-[55%] relative md:h-[80vh] rounded-3xl overflow-hidden h-[40vh]">
          <Image
            fill
            alt=""
            src="/images/about-1.webp"
            className="images origin-bottom w-full h-full absolute inset-0 z-1 object-center object-cover"
          />
          <Image
            fill
            alt=""
            src="/images/about-2.webp"
            className="images origin-bottom  w-full h-full absolute inset-0 z-2 object-center object-cover"
          />
          <Image
            fill
            alt=""
            src="/images/about-3.webp"
            className="images origin-bottom  w-full h-full absolute inset-0 z-3 object-center object-cover"
          />
          <Image
            fill
            alt=""
            src="/images/about-4.webp"
            className="images origin-bottom  w-full h-full absolute inset-0 z-4 object-center object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
