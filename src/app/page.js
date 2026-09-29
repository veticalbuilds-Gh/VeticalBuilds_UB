import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ProjectGrid from "@/components/ProjectGrid";
import ServicesList from "@/components/ServicesList";
import ChannelPartners from "@/components/ChannelPartners";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import MobileContactSection from "@/components/MobileContactSection";
import { client } from "@/sanity/client";

const PROJECTS_QUERY = `*[_type == "project"]{
  "id": slug.current,
  name,
  location,
  type,
  status,
  price,
  description,
  "image": coverImage.asset->url,
  "brochure": brochure.asset->url
}`;

export default async function Home() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, { cache: 'no-store' });

  return (
    <>
      <Hero />
      <AboutPreview />
      <ChannelPartners />
      <ProjectGrid projects={projects} />
      <ServicesList />
      <TeamSection />
      <ContactForm variant="section" />
      <MobileContactSection />
    </>
  );
}
