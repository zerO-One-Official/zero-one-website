import About from "@/components/about/About";
import TechStack from "@/components/techStack/TechStack";
import LandingPage from "@/components/LandingPage/LandingPage";
export const metadata = {
  title: "Home",
  description:
    "ZERO ONE Coding Club Club of Motihari College of Engineering, Motihari",
};
const HomePage = () => {
  return (
    <>
      <LandingPage />
      <About />
      <TechStack />
    </>
  );
};

export default HomePage;
