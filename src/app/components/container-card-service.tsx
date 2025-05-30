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
    if (!container.current) return;

    const cards = container.current.querySelectorAll(".card-service");

    gsap.to(cards, {
      y: (i) => i * -265,
      stagger: 0.15,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top 25%",
        end: "+=1000",
        pin: true,
        scrub: 1,
      },
    });
  }, []);

  return (
    <div ref={container} className="h-fit ">
      <h1 className="text-4xl text-primary font-bold">Service</h1>
      <div className="max-h-screen">
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
