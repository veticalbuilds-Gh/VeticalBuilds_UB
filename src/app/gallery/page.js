import { Suspense } from 'react';
import Gallery from '@/components/Gallery';
import { client } from "@/sanity/client";

export const metadata = {
  title: 'Project Gallery & Walkthroughs | Vetical Builds Pvt Ltd',
  description: 'Immerse yourself in our premium real estate properties. View high-quality galleries and video walkthroughs of Vetical Builds projects.',
};

const GALLERY_QUERY = `*[_type == "project"]{
  "id": slug.current,
  name,
  "overview": galleryOverview,
  amenities,
  "floorPlans": floorPlans[]{
    name,
    "img": image.asset->url
  },
  location,
  "video": video.asset->url,
  "brochure": brochure.asset->url,
  "images": galleryImages[].asset->url
}`;

export default async function GalleryPage() {
  const projects = await client.fetch(GALLERY_QUERY, {}, { cache: 'no-store' });

  return (
    <div style={{ paddingTop: '80px', minHeight: '60vh' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading Gallery...</div>}>
        <Gallery projects={projects} />
      </Suspense>
    </div>
  );
}
