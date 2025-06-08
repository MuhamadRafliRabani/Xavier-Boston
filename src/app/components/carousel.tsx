"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { portofolio } from "../data/carousel";
import gsap from "gsap";

const Carousel = () => {
  const handleMounted = (splide: any) => {
    // Saat di-drag
    splide.on("drag", () => {
      gsap.to(".splide__slide", {
        rotate: (i) => (i % 2 == 0 ? 2 : -3),
        duration: 0.2,
        ease: "power1.out",
      });
    });

    // Saat drag selesai
    splide.on("dragged", () => {
      gsap.to(".splide__slide", {
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };
  return (
    <section className="min-w-fit w-full translate-x-0  h-full">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          gap: "1rem",
          arrows: false,
          pagination: false,
          drag: "free",
          focus: "center",
          autoScroll: {
            speed: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
          ondrag: () => {
            console.info("didrag");
          },
        }}
        extensions={{ AutoScroll }}
        onMounted={handleMounted}
        className="splide"
      >
        {portofolio.map((src, index) => (
          <SplideSlide key={index}>
            <img
              src={"/images" + src}
              alt={`Slide ${index + 1}`}
              className="w-[300px] md:w-full md:h-64  object-cover rounded-lg"
            />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default Carousel;
