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
import { MoreWork } from "@/components/sections/MoreWork";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { StackStrip } from "@/components/sections/StackStrip";
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
          <StackStrip />
          <FeaturedWork />
          <MoreWork />
          <Skills />
          <Experience />
          <Certifications />
          <Testimonials />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </IntroProvider>
    </SmoothScroll>
  );
}
