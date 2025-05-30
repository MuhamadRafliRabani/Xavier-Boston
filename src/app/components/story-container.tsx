"use client";
import { useState } from "react";
import FunFactsCard from "./story";

const facts = [
  {
    number: 31,
    text: "Spotify playlists I've created. But I mainly listen to the blend my boyfriend and I have.",
    image: "/images/1.webp",
    name: "Jane Doe",
  },
  {
    number: 10,
    text: "Matcha shops I visited while in Japan. Not including Suzukien Asakusa, the 7 level matcha gelato store in Tokyo.",
    image: "/images/2.webp",
    name: "Xavier Bostton",
  },
  // Tambah data lain di sini kalau mau
];

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
