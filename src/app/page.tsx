import About from "./components/about";
import Carousel from "./components/carousel";
import ContainerCardService from "./components/container-card-service";
import Questions from "./components/faq";
import Footer from "./components/footer";
import Header from "./components/header";
import StoryContainer from "./components/story-container";

export default function Home() {
  return (
    <section className="max-w-screen space-y-10">
      <Header />

      <Carousel />

      <main className="w-[95%] m-auto ">
        <About />
        <StoryContainer />
        <ContainerCardService />
        <Questions />
      </main>
      <Footer />
    </section>
  );
}
