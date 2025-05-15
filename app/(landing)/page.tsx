import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import LandingContent from "@/components/LandingContent";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  );
}
