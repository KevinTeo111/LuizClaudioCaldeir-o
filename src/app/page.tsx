import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { IntroProvider } from "@/components/providers/Intro";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Cursor } from "@/components/ui/Cursor";

export default function Page() {
  return (
    <SmoothScroll>
      <IntroProvider>
        <Preloader />
        <Cursor />
        <Header />
        <main>
          <Hero />
          <FeaturedWork />
          <Services />
          <ProjectGrid />
          <Experience />
          <Skills />
          <Certifications />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <Footer />
      </IntroProvider>
    </SmoothScroll>
  );
}
