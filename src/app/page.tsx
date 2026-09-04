import { MembershipSection } from "@/components/sections/membership-section";
import { CarouselSection } from "@/components/sections/carousel-section";

export default function Home() {
  return (
    <main className="w-full">
      <CarouselSection />
      <MembershipSection />
    </main>
  );
}
