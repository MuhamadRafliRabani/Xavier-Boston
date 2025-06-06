"use client";

import { useEffect, useRef } from "react";
import { portofolio } from "../data/carousel";
import Image from "next/image";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

// Register plugin
gsap.registerPlugin(Draggable);

const Carousel = () => {
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const carousel = carouselRef.current;

    // Animasi GSAP infinite scroll ke kiri
    const anim = gsap.to(carousel, {
      xPercent: -50, // geser sejauh 50% dari lebar container
      ease: "none",
      duration: 20,
      repeat: -1, // infinite
    });

    // Tambah Draggable biar bisa digeser manual
    Draggable.create(carousel, {
      type: "x",
      inertia: true,
      onPress: () => {
        itemRefs.current.forEach((el, index) => {
          gsap.to(el, {
            rotate: index % 2 === 0 ? -8 : 8,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      },
      onRelease: () => {
        itemRefs.current.forEach((el) => {
          gsap.to(el, {
            rotate: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      },
    });
    // Cleanup saat komponen unmount
    return () => {
      anim.kill();
      Draggable.get(carousel)?.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden w-full py-5 h-110">
      <div
        ref={carouselRef}
        className="flex cursor-grab space-x-4 w-full h-full"
      >
        {[...portofolio, ...portofolio].map((item, index) => (
          <div
            key={index}
            className="min-w-1/5 shrink-0 grow-0 basis-[60%] md:basis-[20%] p-3 h-full bg-[#ffffe3] rounded-xl"
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <Image
              src={"/images" + item}
              alt={item}
              width={200}
              height={400}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
