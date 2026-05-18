import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { TechStack } from "@/components/sections/tech-stack";
import { About3D } from "@/components/sections/about-3d";
import { Portfolio } from "@/components/sections/portfolio";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <TechStack />
      <About3D />
      <Stats />
      <Portfolio limit={3} />
      <Process />
      <Faq />
      <ContactCTA />
    </>
  );
}
