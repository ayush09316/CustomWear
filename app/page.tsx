import Canvas from "@/canvas";
import Customizer from "@/components/mainComponents/Customizer";
import LandingPage from "@/components/mainComponents/LandingPage";

export default function Home() {
  return (
    <main className="app transition-all ease-in">
      <LandingPage/>
      <Canvas/>
      <Customizer/>
    </main>
  );
}

