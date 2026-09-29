import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { IntroProvider } from "@/components/providers/Intro";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { DesignShow } from "@/components/sections/DesignShow";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Cursor } from "@/components/ui/Cursor";
import { FloatingWorkana } from "@/components/ui/WorkanaButton";

export default function Page() {
  return (
    <SmoothScroll>
      <IntroProvider>
        <Preloader />
        <Cursor />
        <Header />
        <main>
          <Hero />
          <Process />
          <Services />
          <DesignShow />
          <Projects />
          <Testimonials />
          <Skills />
          <Experience />
          <Certifications />
          <About />
          <Contact />
        </main>
        <Footer />
        <FloatingWorkana />
      </IntroProvider>
    </SmoothScroll>
  );
}
