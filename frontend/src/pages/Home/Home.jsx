import React from "react";
import HeroSection from "./hero/Hero";
import ServicesSection from "./services/services";
import AboutUsSection from "./aboutUs/aboutUs";
import OurTeamSection from "./team/team";
import LatestNewsSection from "./latestNews/latestNews";
import ContactUsSection from "./ContactUs/ContactUs";
import WhyChooseUsSection from "./whyChooseUs/whyChooseUs";
import TestimonialsSection from "./testimonials/testimonials";
import Footer from "../../components/footer/footer";

function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />

      <AboutUsSection />
      <OurTeamSection />
      <LatestNewsSection />
      <TestimonialsSection />

      <ContactUsSection />
      <Footer />
    </div>
  );
}

export default Home;
