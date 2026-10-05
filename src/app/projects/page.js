export const metadata = {
  title: 'Vetical Builds Projects | Real Estate & Construction',
  description: 'Explore Vetical Builds projects, featuring premium residential and commercial developments in Bangalore and surrounding locations.',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Featured Projects | Vetical Builds', url: '/projects' },
};

import ProjectGrid from "@/components/ProjectGrid";
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

export default async function ProjectsPage() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, { cache: 'no-store' });

  return (
    <div style={{ paddingTop: '80px', minHeight: '60vh' }}>
      <ProjectGrid projects={projects} />
    </div>
  );
}
