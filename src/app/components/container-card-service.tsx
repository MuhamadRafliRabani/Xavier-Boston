"use client";
import { useEffect, useRef } from "react";
import CardService from "./card-service";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { service } from "../data/service";

gsap.registerPlugin(ScrollTrigger);

const ContainerCardService = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1020px)", () => {
      if (!container.current) return;
      // Animasi untuk layar besar (desktop)
      const cards = container.current.querySelectorAll(".card-service");
      gsap.to(cards, {
        y: (i) => i * -265,
        stagger: 0.15,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 10%",
          end: "+=1000",
          pin: true,
          scrub: 1,
          markers: true,
        },
      });
    });

    mm.add("(max-width: 768px)", () => {
      if (!container.current) return;

      const cards = container.current.querySelectorAll(".card-service");
      gsap.to(cards, {
        y: (i) => (i == 0 ? i * 10 : i * -300),
        stagger: 0.115,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 5%",
          end: "+=600",
          pin: true,
          scrub: 1,
          markers: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={container} className="min-h-[95dvh] md:h-fit">
      <h1 className="text-4xl text-primary font-bold">Service</h1>
      <div className="max-h-[70vh] ">
        {service.map((item, index) => (
          <CardService
            i={index}
            image={item.image}
            title={item.title}
            description={item.description}
            background={item.background}
          />
        ))}
      </div>
    </div>
  );
};

export default ContainerCardService;
