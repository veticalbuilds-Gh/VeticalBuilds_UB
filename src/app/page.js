import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ProjectGrid from "@/components/ProjectGrid";
import ServicesList from "@/components/ServicesList";
import ChannelPartners from "@/components/ChannelPartners";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import MobileContactSection from "@/components/MobileContactSection";
import { client } from "@/sanity/client";

export const metadata = {
  title: "Vetical Builds Pvt Ltd | Real Estate & Construction Company in Bangalore",
  description:
    "Vetical Builds Pvt Ltd is a premium real estate and construction company in Bangalore delivering residential, commercial, and development solutions with a focus on quality and design.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vetical Builds Pvt Ltd | Real Estate & Construction Company in Bangalore",
    description:
      "Premium residential, commercial, and development projects in Bangalore.",
    url: "https://www.veticalbuilds.com/",
  },
};
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
      <ProjectGrid projects={projects} headingLevel="h2" />
      <ServicesList />
      <TeamSection />
      <ContactForm variant="section" headingLevel="h2" />
      <MobileContactSection />
    </>
  );
}
