import type { Stop } from "../types";

export const ITINERARY: Stop[] = [
  {
    id: "cappadocia",
    place: "Cappadocia",
    location: "Göreme, Turkey",
    tag: "Top rated",
    blurb: "Dawn balloon ascent over the fairy chimneys, private launch.",
    photo:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
    accent: "#E8843C",
  },
  {
    id: "kyoto",
    place: "Kyoto",
    location: "Kansai, Japan",
    tag: "Member favourite",
    blurb: "A garden ryokan held for you, tea at first light.",
    photo:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    accent: "#E5647A",
  },
  {
    id: "amalfi",
    place: "Amalfi",
    location: "Campania, Italy",
    tag: "Signature",
    blurb: "Cliffside marina, a boat waiting whenever the water calls.",
    photo:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    accent: "#2E9BD6",
  },
  {
    id: "marrakech",
    place: "Marrakech",
    location: "Marrakesh-Safi, Morocco",
    tag: "Hidden gem",
    blurb: "A walled riad behind an unmarked door, courtyard to yourself.",
    photo:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=800&auto=format&fit=crop",
    accent: "#E0A43B",
  },
  {
    id: "reykjavik",
    place: "Reykjavík",
    location: "Höfuðborg, Iceland",
    tag: "Seasonal",
    blurb: "Aurora lodge off-grid, woken only if the sky performs.",
    photo:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
    accent: "#3FB79A",
  },
];

/** Resting angles for cards hanging on the line. */
export const HANG_TILTS = [-4, 3.5, -2.5, 4.5, -3.5];

export const SWIPE_DISTANCE = 78;
export const SWIPE_VELOCITY = 380;
