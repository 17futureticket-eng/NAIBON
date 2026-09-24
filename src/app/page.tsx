import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MetricsStrip from "@/components/sections/MetricsStrip";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Audience from "@/components/sections/Audience";
import HowItWorks from "@/components/sections/HowItWorks";
import ProtocolTrust from "@/components/sections/ProtocolTrust";
import Incentive from "@/components/sections/Incentive";
import ProductPreview from "@/components/sections/ProductPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MetricsStrip />
        <Problem />
        <Solution />
        <Audience />
        <HowItWorks />
        <ProtocolTrust />
        <Incentive />
        <ProductPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
