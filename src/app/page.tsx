import { ItinerarySection } from "@/features/itinerary";
import { MembershipSection } from "@/features/membership";

export default function Home() {
  return (
    <main className="w-full">
      <ItinerarySection />
      <MembershipSection />
    </main>
  );
}
