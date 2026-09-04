import { MembershipSection } from "@/features/membership";
import { ItinerarySection } from "@/features/itinerary";

export default function Home() {
  return (
    <main className="w-full">
      <MembershipSection />
      <ItinerarySection />
    </main>
  );
}
