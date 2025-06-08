"use client";
import { Fragment, useEffect, useRef } from "react";
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
      const cards = container.current.querySelectorAll(".card-service");

      gsap.to(cards, {
        y: (i) => i * -265,
        stagger: 0.15,
        scale: (i) => 0.95 + i * 0.01,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 10%",
          end: "+=1100",
          pin: true,
          scrub: 1,
        },
      });
    });

    mm.add("(max-width: 768px)", () => {
      if (!container.current) return;

      const cards = container.current.querySelectorAll(".card-service");

      gsap.to(cards, {
        y: (i) => (i == 0 ? i * 10 : i * -300),
        stagger: 0.115,
        scale: (i) => 0.95 + i * 0.01,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 5%",
          end: "+=600",
          pin: true,
          scrub: 1,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={container} className="max-h-screen">
      <h1 className="text-4xl mb-4 text-primary font-bold">Service</h1>
      {service.map((item, index) => (
        <Fragment key={index}>
          <CardService
            i={index}
            image={item.image}
            title={item.title}
            description={item.description}
            background={item.background}
          />
        </Fragment>
      ))}
    </section>
  );
};

export default ContainerCardService;
