import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function FunFactsCard({
  fact,
  current,
  total,
  onPrev,
  onNext,
}: any) {
  const imageRef = useRef(null);
  const numberRefs = useRef<any[]>([]); // array of refs tiap digit

  const handleNext = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onNext();
        gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
      },
    });
  };

  const handlePrev = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        onPrev();
        gsap.to(imageRef.current, { opacity: 1, duration: 0.8 });
      },
    });
  };

  useEffect(() => {
    // Rolling animasi tiap digit
    const numberStr = String(fact.number).padStart(2, "0").split("");

    numberStr.forEach((digit, i) => {
      const el = numberRefs.current[i];
      if (!el) return;

      // Reset posisi ke bawah sebelum animasi
      gsap.set(el, { y: "100%" });

      // Set value baru di innerText
      el.innerText = digit;

      // Animasi naik ke posisi normal
      gsap.to(el, {
        y: "0%",
        duration: 0.4,
        ease: "power2.out",
        delay: i * 0.05, // cascade delay tiap digit
      });
    });
  }, [fact]);

  return (
    <div className="min-h-[80vh] p-3 md:p-6 rounded-xl justify-end flex md:justify-between md:flex-row flex-col-reverse  gap-4 md:mt-4 md:min-h-[70vh] ">
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 w-full h-[40vh] md:w-[70%] md:h-[50vh]  ">
        {/* Image */}
        <div
          className="rounded-lg min-h-[25vh] overflow-hidden border-4 border-pink-50 w-full md:w-1/2"
          ref={imageRef}
        >
          <Image
            src={fact.image}
            alt="Fun Fact Image"
            width={500}
            height={500}
            className="object-cover h-full md:w-full"
          />
        </div>

        {/* Number & Text */}
        <div className="bg-pink-50 p-6 rounded-lg flex flex-col items-start w-full md:w-1/2">
          {/* Rolling Number */}
          <div className="flex h-[60%] space-x-2">
            {String(fact.number)
              .padStart(2, "0")
              .split("")
              .map((digit, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden w-[0.8em] h-[1em] flex justify-center"
                >
                  <span
                    ref={(el) => (numberRefs.current[index] = el)}
                    className="absolute text-[9.5em]/[0.7em] font-bold"
                  >
                    {digit ?? 36}
                  </span>
                </div>
              ))}
          </div>

          {/* Text */}
          <p className="text-xl min-h-[120px] md:text-2xl text-black md:h-[40%] mt-auto">
            {fact.text}
          </p>
        </div>
      </div>

      <section className="w-full h-[100px] md:w-[20%] nd:h-[50vh] space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-medium">Fun Facts</h2>
          <span className="text-sm">
            {String(current).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <hr />

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-white shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
