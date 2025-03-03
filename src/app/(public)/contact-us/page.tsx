"use client";

import Container from "@/components/common/Container";
import ContactForm from "./components/ContactForm";

export default function ContactUsPage() {
  return (
    <Container isHideContactFormFooter>
      <ContactForm />
    </Container>
  );
}
