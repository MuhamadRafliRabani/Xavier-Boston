"use client";
import { useState } from "react";
import FunFactsCard from "./story";
import { facts } from "../data/faq";

export default function StoryContainer() {
  const [index, setIndex] = useState(0);

  return (
    <FunFactsCard
      fact={facts[index]}
      current={index + 1}
      total={facts.length}
      onPrev={() =>
        setIndex((prev) => (prev > 0 ? prev - 1 : facts.length - 1))
      }
      onNext={() =>
        setIndex((prev) => (prev < facts.length - 1 ? prev + 1 : 0))
      }
    />
  );
}
