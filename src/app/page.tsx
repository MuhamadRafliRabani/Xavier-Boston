import About from "./components/about";
import Carousel from "./components/carousel";
import ContainerCardService from "./components/container-card-service";
import Questions from "./components/faq";
import Footer from "./components/footer";
import Story from "./components/story";
import StoryContainer from "./components/story-container";

export default function Home() {
  return (
    <div className="max-w-screen space-y-10">
      <header className="ps-4 w-full space-y-1 text-center overflow-hidden">
        <h1 className="text-[10.35em]/[0.9em] font-extrabold">XAVIER BOSTON</h1>

        <div className="flex justify-between items-center font-bold text-[1.45em]/[1.4em] w-[97%] m-auto">
          <p>Content Creation & Digital Storytelling</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-4 fill-[#161616]"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </svg>
          <p className="font-light italic me-4">
            Scaling brands reach and impact
          </p>
        </div>
      </header>

      <Carousel />

      <main className="w-[95%] m-auto">
        <About />
        {/* <Story /> */}
        <StoryContainer />
        <ContainerCardService />
        <Questions />
      </main>
      <Footer />
    </div>
  );
}
