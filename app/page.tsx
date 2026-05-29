import { Hero } from "@/components/blocks/hero";
import { KeywordMarquee } from "@/components/blocks/keyword-marquee";
import { Statement } from "@/components/blocks/statement";
import { Services } from "@/components/blocks/services";
import { Guarantee } from "@/components/blocks/guarantee";
import { Materials } from "@/components/blocks/materials";
import { WhyUs } from "@/components/blocks/why-us";
import { Gallery } from "@/components/blocks/gallery";
import { ContactCta } from "@/components/blocks/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <KeywordMarquee />
      <Statement />
      <Services />
      <Guarantee />
      <Materials />
      <WhyUs />
      <Gallery />
      <ContactCta />
    </>
  );
}
