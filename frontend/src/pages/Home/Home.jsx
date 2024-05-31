import React from "react";
import Header from "./header/header";
import HeroSection from "./hero/Hero";
import ServicesSection from "./services/services";
import WhyChooseUsSection from "./whyChooseUs/whyChooseUs";
import AboutUsSection from "./aboutUs/aboutUs";
import OurTeamSection from "./team/team";
import TestimonialsSection from "./testimonials/testimonials";
import LatestNewsSection from "./latestNews/latestNews";
import ContactUsSection from "./ContactUs/ContactUs";
import Footer from "./footer/footer";

function Home() {
    return (
        <div>
            <Header />
            <HeroSection />
            <ServicesSection />
            <WhyChooseUsSection />
            <AboutUsSection />
            <OurTeamSection />
            <TestimonialsSection />
            <LatestNewsSection />
            <ContactUsSection />
            <Footer />
        </div>
    );
}

export default Home;
