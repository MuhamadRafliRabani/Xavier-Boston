"use client";
import Image from "next/image";
import { Service } from "../data/service";

const CardService = ({ i, background, description, image, title }: Service) => {
  return (
    <div
      style={
        i != 0
          ? { transform: `translateY(20px)`, backgroundColor: background }
          : { backgroundColor: background }
      }
      key={i}
      className="card-service p-6 rounded-2xl max-h-110 flex flex-col lg:flex-row gap-4 items-center "
    >
      {/* Left Side */}
      <div className="flex-1 h-full w-full basis-[35%]">
        <Image
          src={image} // ganti path sesuai gambar kamu
          alt={title}
          width={500}
          height={350}
          className="rounded-xl object-cover w-full max-h-40  md:max-h-70"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col basis-[75%] justify-start items-end gap-2 md:gap-20">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#161616]">
          {title}
        </h2>

        <div className="flex flex-row-reverse gap-10">
          <p className="md:text-lg max-w-xl text-[#161616] w-3/5 leading-relaxed">
            {description}
          </p>
          <div className="text-sm text-[#161616] gap-y-3">
            <span className="block ">Authenticity</span>
            <span className="block ">Engagement</span>
            <span className="block ">Trust</span>
            <span className="block ">Community Building</span>
            <span className="block ">Brand Advocacy</span>
            <span className="block ">Organic Reach</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardService;
