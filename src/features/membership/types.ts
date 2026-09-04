export type EmblemKey = "waves" | "torii" | "arch" | "aurora" | "peak";

export interface DestinationCard {
  id: string;
  /** Primary place name shown large on the card. */
  destination: string;
  /** Region / country line under the destination. */
  region: string;
  /** Short poetic descriptor of the residence type. */
  residence: string;
  /** Illustrative member name (synthetic placeholder data). */
  member: string;
  /** Member-since year, illustrative. */
  since: string;
  /** Serialized access number, illustrative. */
  serial: string;
  /** Decorative coordinates for the place. */
  coordinates: string;
  /** Access tier label. */
  tier: string;
  /** Which line emblem to render. */
  emblem: EmblemKey;
  /** Color world for the card surface. */
  colors: {
    /** Top-left gradient stop. */
    from: string;
    /** Mid gradient stop. */
    via: string;
    /** Bottom-right gradient stop. */
    to: string;
    /** Accent used for detail ink, engraving and glow. */
    accent: string;
    /** Ambient stage glow color for this card. */
    glow: string;
  };
}
