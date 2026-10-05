import ContactForm from "@/components/ContactForm";
import MobileContactSection from "@/components/MobileContactSection";

export const metadata = {
  title: 'Contact Vetical Builds | Real Estate & Construction',
  description: 'Contact Vetical Builds Pvt Ltd for project details, property inquiries, and site visits for premium residential and commercial developments.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Us | Vetical Builds', url: '/contact' },
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh', backgroundColor: 'var(--bg-off-white)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        <ContactForm />
      </div>
      <MobileContactSection />
    </div>
  );
}
