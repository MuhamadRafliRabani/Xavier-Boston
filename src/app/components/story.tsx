"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "react-feather";
import gsap from "gsap";

type Fact = { number: number; text: string; image: string };
type Props = {
  fact: Fact;
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function FunFactsCard({
  fact,
  current,
  total,
  onPrev,
  onNext,
}: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  const digits = String(fact.number)
    .padStart(2, "0")
    .split("")
    .map((d) => parseInt(d, 10));

  useEffect(() => {
    animateDigits(digits, spanRefs.current);

    gsap.to(hrRef.current, {
      width: "100%",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "-=100px center",
        toggleActions: "play none none reverse",
      },
    });
  }, [fact.number]);

  const animateDigits = (digits: number[], els: HTMLSpanElement[]) => {
    digits.forEach((d, i) => {
      const el = els[i];
      if (!el) return;
      gsap.to(el, {
        y: `${-d}em`,
        duration: 0.6,
        ease: "power3.inOut",
      });
    });
  };

  const handleHoverBtn = (
    ref: React.RefObject<HTMLButtonElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const [a1, a2] = ref.current.querySelectorAll<SVGElement>(".arrow");
    const distance = direction === "left" ? -40 : 40;
    gsap.to(a2, { x: 0, duration: 0.5, ease: "back.inOut" });
    gsap.to(a1, { x: distance, duration: 0.5, ease: "back.inOut" });
  };

  const handleLeaveBtn = (
    ref: React.RefObject<HTMLButtonElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const [a1, a2] = ref.current.querySelectorAll<SVGElement>(".arrow");
    gsap.to(a2, {
      x: direction === "left" ? 30 : -30,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(a1, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  const fadeImage = (isNext: boolean) => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        isNext ? onNext() : onPrev();
        gsap.to(imageRef.current, { opacity: 1, duration: 0.4 });
      },
    });
  };

  return (
    <>
      <hr ref={hrRef} className="hr" />
      <section className="min-h-screen p-3 rounded-xl flex md:flex-row md:items-center flex-col-reverse justify-end gap-4 pt-6 md:pt-3">
        <div className="flex flex-col md:flex-row gap-6 w-full h-[40vh] md:w-[75%] md:h-[50vh]">
          <div className="rounded-lg min-h-[25vh] overflow-hidden bg-white backdrop-blur-3xl w-full md:w-[45%]">
            <Image
              ref={imageRef}
              src={fact.image}
              alt=""
              fill
              className="object-cover p-2 rounded-lg"
            />
          </div>
          <div className="bg-pink-50 p-6 rounded-lg flex flex-col items-start w-full md:w-1/2">
            <div className="flex space-x-2 overflow-hidden text-[120px]/[1rem] font-bold ">
              {digits.map((_, i) => (
                <div
                  key={i}
                  className="relative w-[0.6em] h-[1em] overflow-hidden"
                >
                  <span
                    ref={(el) => {
                      if (el) spanRefs.current[i] = el;
                    }}
                    className="absolute top-0 left-0 block"
                  >
                    {"0123456789".split("").map((d) => (
                      <span
                        key={d}
                        className="block"
                        style={{
                          height: "1em",
                          lineHeight: "1em",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xl md:text-2xl mt-auto md:font-medium">
              {fact.text}
            </p>
          </div>
        </div>

        <div className="w-full h-[100px] md:w-[20%] md:h-[50vh] space-y-4">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg font-medium">Fun Facts</h2>
            <span className="text-sm ">
              {String(current).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <hr />
          <div className="flex gap-3">
            <button
              ref={prevRef}
              onClick={() => fadeImage(false)}
              onMouseEnter={() => handleHoverBtn(prevRef, "left")}
              onMouseLeave={() => handleLeaveBtn(prevRef, "left")}
              className="p-2 rounded-full md:max-h-9 h-9 md:h-full bg-white shadow overflow-hidden"
            >
              <ChevronLeft className="size-5 arrow" />
              <ChevronLeft className="size-5 arrow -translate-y-5 translate-x-[30px]" />
            </button>
            <button
              ref={nextRef}
              onClick={() => fadeImage(true)}
              onMouseEnter={() => handleHoverBtn(nextRef, "right")}
              onMouseLeave={() => handleLeaveBtn(nextRef, "right")}
              className="p-2 rounded-full md:max-h-9 h-9 md:h-full bg-white shadow overflow-hidden"
            >
              <ChevronRight className="size-5 arrow" />
              <ChevronRight className="size-5 arrow -translate-y-5 -translate-x-[-30px]" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// export default function FunFactsCard({
//   fact,
//   current,
//   total,
//   onPrev,
//   onNext,
// }: any) {
//   const imageRef = useRef(null);
//   const hr = useRef(null);
//   const prevRef = useRef<HTMLButtonElement>(null);
//   const nextRef = useRef<HTMLButtonElement>(null);
//   const spanRef = useRef<HTMLSpanElement>(null);

//   if (!spanRef) return null;
//   const handleNext = () => {
//     gsap.to(imageRef.current, {
//       opacity: 0,
//       duration: 0.3,
//       onComplete: () => {
//         onNext();
//         gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
//       },
//     });
//   };

//   const handlePrev = () => {
//     gsap.to(imageRef.current, {
//       opacity: 0,
//       duration: 0.8,
//       onComplete: () => {
//         onPrev();
//         gsap.to(imageRef.current, { opacity: 1, duration: 0.8 });
//       },
//     });
//   };

//   const handleHover = (
//     ref: RefObject<HTMLButtonElement | null>,
//     dir: string
//   ) => {
//     if (!ref.current) return;

//     const [arrow1, arrow2] = ref.current.querySelectorAll(".arrow");

//     if (dir == "left") {
//       gsap.to(arrow2, {
//         x: 0,
//         duration: 0.5,
//         ease: "back.inOut",
//       });

//       gsap.to(arrow1, {
//         x: -40,
//         duration: 0.5,
//         ease: "back.inOut",
//       });
//     } else {
//       gsap.to(arrow2, {
//         x: 0,
//         duration: 0.5,
//         ease: "back.inOut",
//       });

//       gsap.to(arrow1, {
//         x: 30,
//         duration: 0.5,
//         ease: "back.inOut",
//       });
//     }
//   };

//   const handleLeave = (
//     ref: RefObject<HTMLButtonElement | null>,
//     dir: string
//   ) => {
//     if (!ref.current) return;

//     const [arrow1, arrow2] = ref.current.querySelectorAll(".arrow");

//     if (dir == "left") {
//       gsap.to(arrow2, {
//         x: 30,
//         duration: 0.3,
//         ease: "power2.out",
//       });

//       gsap.to(arrow1, {
//         x: 0,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     } else {
//       gsap.to(arrow2, {
//         x: -30,
//         duration: 0.3,
//         ease: "power2.out",
//       });

//       gsap.to(arrow1, {
//         x: 0,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     }
//   };

//   return (
//     <>
//       <hr ref={hr} className="hr" />
//       <div className="min-h-[80vh] p-3 rounded-xl justify-end md:items-center flex md:justify-between md:flex-row flex-col-reverse gap-4 md:min-h-screen ">
//         {/* Content */}

//         <div className="flex flex-col md:flex-row gap-6 w-full h-[40vh] md:w-[70%] md:h-[50vh]  ">
//           {/* Image */}
//           <div
//             className="rounded-lg min-h-[25vh] overflow-hidden border-4 border-pink-50 w-full md:w-1/2"
//             ref={imageRef}
//           >
//             <Image
//               src={fact.image}
//               alt="Fun Fact Image"
//               width={500}
//               height={500}
//               className="object-cover h-full md:w-full"
//             />
//           </div>

//           {/* Number & Text */}
//           <div className="bg-pink-50 p-6 rounded-lg flex flex-col items-start w-full md:w-1/2">
//             <div className="flex space-x-2 overflow-hidden">
//               {digits.map((_, i) => (
//                 <div
//                   key={i}
//                   className="relative overflow-hidden w-[0.8em] h-[1em] flex justify-center"
//                 >
//                   <span
//                     ref={(el) => {
//                       if (el) spanRef.current[i] = el;
//                     }}
//                     className="absolute top-0 left-0 block"
//                   >
//                     {"0123456789".split("").map((d) => (
//                       <span
//                         key={d}
//                         style={{
//                           display: "block",
//                           height: "1em",
//                           lineHeight: "1em",
//                         }}
//                       >
//                         {d}
//                       </span>
//                     ))}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Text */}
//             <p className="text-xl min-h-[120px] md:text-2xl text-black md:h-[40%] mt-auto">
//               {fact.text}
//             </p>
//           </div>
//         </div>

//         <section className="w-full h-[100px] md:w-[20%] md:h-[50vh] space-y-4">
//           {/* Header */}
//           <div className="flex justify-between items-center w-full">
//             <h2 className="text-lg font-medium">Fun Facts</h2>
//             <span className="text-sm">
//               {String(current).padStart(2, "0")} /{" "}
//               {String(total).padStart(2, "0")}
//             </span>
//           </div>

//           <hr />

//           {/* Navigation */}
//           <div className="flex gap-3">
//             <button
//               ref={prevRef}
//               onClick={handlePrev}
//               onMouseEnter={() => handleHover(prevRef, "left")}
//               onMouseLeave={() => handleLeave(prevRef, "left")}
//               className="p-2 rounded-full md:max-h-9 bg-white shadow overflow-hidden"
//             >
//               <ChevronLeft className="size-5 arrow" />
//               <ChevronLeft className="size-5 arrow -translate-y-5 translate-x-[30px]" />
//             </button>

//             <button
//               ref={nextRef}
//               onClick={handleNext}
//               onMouseEnter={() => handleHover(nextRef, "right")}
//               onMouseLeave={() => handleLeave(nextRef, "right")}
//               className="p-2 rounded-full md:max-h-9 bg-white shadow overflow-hidden"
//             >
//               <ChevronRight className="size-5 arrow" />
//               <ChevronRight className="size-5 arrow -translate-y-5 -translate-x-[30px]" />
//             </button>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
