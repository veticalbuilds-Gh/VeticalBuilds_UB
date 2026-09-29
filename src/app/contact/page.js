import ContactForm from "@/components/ContactForm";
import MobileContactSection from "@/components/MobileContactSection";

export const metadata = {
  title: "Contact Us | Vetical Builds Pvt Ltd",
  description: "Get in touch with Vetical Builds Pvt Ltd. Book a site visit, inquire about projects, or connect with our sales team.",
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
