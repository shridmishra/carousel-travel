import type { Stop } from "../types";

export const ITINERARY: Stop[] = [
  {
    id: "cappadocia",
    place: "Cappadocia",
    location: "Göreme, Turkey",
    tag: "Top rated",
    blurb: "Dawn balloon ascent over the fairy chimneys, private launch.",
    photo: "/images/itinerary/cappadocia.webp",
    accent: "#E8843C",
  },
  {
    id: "kyoto",
    place: "Kyoto",
    location: "Kansai, Japan",
    tag: "Member favourite",
    blurb: "A garden ryokan held for you, tea at first light.",
    photo: "/images/itinerary/kyoto.webp",
    accent: "#E5647A",
  },
  {
    id: "amalfi",
    place: "Amalfi",
    location: "Campania, Italy",
    tag: "Signature",
    blurb: "Cliffside marina, a boat waiting whenever the water calls.",
    photo: "/images/itinerary/amalfi.webp",
    accent: "#2E9BD6",
  },
  {
    id: "marrakech",
    place: "Marrakech",
    location: "Marrakesh-Safi, Morocco",
    tag: "Hidden gem",
    blurb: "A walled riad behind an unmarked door, courtyard to yourself.",
    photo: "/images/itinerary/marrakech.webp",
    accent: "#E0A43B",
  },
  {
    id: "reykjavik",
    place: "Reykjavík",
    location: "Höfuðborg, Iceland",
    tag: "Seasonal",
    blurb: "Aurora lodge off-grid, woken only if the sky performs.",
    photo: "/images/itinerary/reykjavik.webp",
    accent: "#3FB79A",
  },
];

/** Resting angles for cards hanging on the line. */
export const HANG_TILTS = [-4, 3.5, -2.5, 4.5, -3.5];

export const SWIPE_DISTANCE = 78;
export const SWIPE_VELOCITY = 380;
