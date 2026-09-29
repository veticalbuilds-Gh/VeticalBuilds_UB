export const metadata = {
  title: 'Featured Projects | Vetical Builds Pvt Ltd',
  description: 'Explore our portfolio of premium residential and commercial projects. Discover luxury living and prime commercial spaces with Vetical Builds.',
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
