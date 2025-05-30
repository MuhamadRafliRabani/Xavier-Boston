export type Service = {
  background: string;
  title: string;
  description: string;
  image: string;
  i?: number; // Optional index for styling purposes
};

export const service: Service[] = [
  {
    background: "#A6F1E0",
    title: "UGC",
    description:
      "I leverage authentic content created by users to build trust and engagement with your audience, enhancing brand credibility and reach.",
    image: "/images/9.webp",
  },
  {
    background: "#F9D5E5",
    title: "Content Creation",
    description:
      "I create compelling and engaging content that resonates with your audience, driving brand awareness and loyalty.",
    image: "/images/2.webp",
  },
  {
    background: "#FEE2E2",
    title: "Digital Storytelling",
    description:
      "I craft narratives that connect emotionally with your audience, enhancing brand identity and fostering deeper relationships.",
    image: "/images/3.webp",
  },
  {
    background: "#D1FAE5",
    title: "Brand Strategy",
    description:
      "I develop comprehensive strategies that align your brand's vision with market trends, ensuring sustainable growth and impact.",
    image: "/images/5.webp",
  },
];
