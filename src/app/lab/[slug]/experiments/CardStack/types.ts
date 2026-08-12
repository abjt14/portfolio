// Separate module: importing these from index.tsx would close a cycle with
// Cards.tsx and hooks/useCardStyles.ts.
export type CardStackOptionKey =
  | "scrollSnap"
  | "translateX"
  | "scale"
  | "zIndex"
  | "rotateY"
  | "perspective";

export type CardStackOption = {
  enabled: boolean;
  title: string;
};

export type CardStackOptions = Record<CardStackOptionKey, CardStackOption>;

export type OptionEntry = [CardStackOptionKey, CardStackOption];

/** Inputs to useCardStyles; VisibleCard forwards exactly these. */
export type CardStyleParams = {
  cardCount: number;
  globalScrollProgress: number;
  activeIndex: number;
  index: number;
  options: CardStackOptions;
};
