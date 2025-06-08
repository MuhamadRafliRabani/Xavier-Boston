"use client";
import { useState, useRef, useEffect } from "react";
import { Plus } from "react-feather";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { questions } from "../data/faq";

gsap.registerPlugin(SplitText);

export default function Questions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = useRef<HTMLDivElement>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!container.current) return;

    const questions = gsap.utils.toArray(".question") as HTMLElement[];
    const borders = gsap.utils.toArray(".question-border") as HTMLElement[];

    const questionSplit = new SplitText(questions, { type: "words" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(questionSplit.words, {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
    }).to(
      borders,
      {
        width: "100%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      "<"
    );
  }, []);

  useEffect(() => {
    answerRefs.current.forEach((el, idx) => {
      if (!el) return;
      const content = el.querySelector(".answer-content") as HTMLElement;

      if (!content) return;

      const tl = gsap.timeline();

      if (activeIndex === idx) {
        // Expand & animate text
        const split = new SplitText(content, { type: "lines" });

        el.style.maxHeight = "0px";
        const fullHeight = content.scrollHeight + "px";

        tl.to(el, {
          maxHeight: fullHeight,
          duration: 0.5,
          ease: "power2.inOut",
        }).from(
          split.lines,
          {
            y: 20,
            opacity: 0,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out",
          },
          "<"
        );
      } else {
        // Collapse
        tl.to(el, { maxHeight: 0, duration: 0.5, ease: "power2.inOut" });
      }
    });
  }, [activeIndex]);

  return (
    <section className="h-full md:min-h-full w-full pt-10  pb-16 md:py-16 flex justify-center md:flex-row flex-col">
      <h2 className="text-2xl font-bold md:font-normal mb-8 w-full md:w-[30%] md:ps-4 md:text-xl">
        Some questions
      </h2>
      <div ref={container} className="w-full md:w-[70%]">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border-t border-black group origin-left w-0 question-border"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex justify-between items-center py-6 text-left"
            >
              <span className="question font-semibold text-xl">
                {item.question}
              </span>
              <Plus className="size-6 group-hover:rotate-180 transition-all duration-700" />
            </button>

            <div
              // @ts-ignore
              ref={(el) => (answerRefs.current[index] = el)}
              className="overflow-hidden max-h-0"
            >
              <div className="py-4 text-gray-600 answer-content">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
