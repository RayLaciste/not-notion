import { Button } from "@/components/ui/button";
import { Header } from "./_components/header";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";

const LandingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Header />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
