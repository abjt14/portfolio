"use client";

import React from "react";
import Link from "next/link";
import useCardStyles from "./hooks/useCardStyles";
import clsx from "clsx";
import type { CardStackOptions, CardStyleParams } from "./types";

export default function CardStack({
  children,
  options,
}: {
  children: React.ReactNode;
  options: CardStackOptions;
}) {
  // Children arrive as an array of arrays when the parent uses multiple map()
  // calls, so flatten to index them. Memoised because toArray clones every
  // child to re-key it, and this re-renders on each scroll event.
  const cardChildren = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  const cardCount = cardChildren.length;

  const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [globalScrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const container = scrollableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const scrollableDistance = scrollWidth - clientWidth;
      // guard the single-card case, where there is nothing to scroll
      const newScrollProgress =
        scrollableDistance > 0 ? scrollLeft / scrollableDistance : 0;
      setScrollProgress(newScrollProgress);

      // scroll amount per card normalized to a value between 0 and 1
      const relativeScrollPerCard = cardCount > 1 ? 1 / (cardCount - 1) : 1;

      // Move the active index one card at a time until it holds the card nearest
      // the current scroll position. The handover lands exactly when the
      // neighbouring card is centred, and that is what keeps rotateY and z-index
      // continuous across the switch — both flip sign on activeCardScrollProgress,
      // which is 0 at that moment. Rounding to the nearest card instead hands over
      // at the half-card point, where those values are at their peak, so every
      // card visibly snaps to its mirror image mid-scroll.
      setActiveIndex((currentIndex) => {
        let nextIndex = currentIndex;
        // the relative and normalized scroll positions where the previous and
        // next card start. Looping (rather than a single step) covers a scroll
        // that jumps more than one card in a single event.
        while (
          nextIndex > 0 &&
          newScrollProgress <= relativeScrollPerCard * (nextIndex - 1)
        ) {
          nextIndex -= 1;
        }
        while (
          nextIndex < cardCount - 1 &&
          newScrollProgress >= relativeScrollPerCard * (nextIndex + 1)
        ) {
          nextIndex += 1;
        }
        return nextIndex;
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [cardCount]);

  return (
    <div
      className="relative h-60"
      style={{
        width: "24rem",
      }}
    >
      <div
        ref={scrollableContainerRef}
        className={clsx(
          "h-full flex overflow-x-scroll hide-scrollbar",
          options.scrollSnap.enabled && "snap-x snap-mandatory"
        )}
      >
        {Array.from({ length: cardCount }).map((_, index) => {
          return <ScrollableCard key={index} index={index} />;
        })}
      </div>
      <div
        className="absolute top-0 left-0 h-full w-full pointer-events-none"
        style={{
          perspective: options.perspective.enabled ? "48rem" : "none",
        }}
      >
        {Array.from({ length: cardCount }).map((_, index) => {
          return (
            <VisibleCard
              key={index}
              cardCount={cardCount}
              globalScrollProgress={globalScrollProgress}
              activeIndex={activeIndex}
              index={index}
              options={options}
            >
              {cardChildren[index]}
            </VisibleCard>
          );
        })}
      </div>
    </div>
  );
}

function ScrollableCard({ index }: { index: number }) {
  return (
    <Link
      href="#"
      // snap-always ensures that the scroll always snaps to the nearest card
      className="w-full h-full snap-start snap-always focus:outline-none"
      style={{
        flex: "1 0 100%",
      }}
      aria-label={`scrollable card ${index + 1}`}
    />
  );
}

function VisibleCard({
  cardCount,
  globalScrollProgress,
  activeIndex,
  index,
  children,
  options,
}: CardStyleParams & { children: React.ReactNode }) {
  const cardStyles = useCardStyles({
    cardCount,
    globalScrollProgress,
    activeIndex,
    index,
    options,
  });

  return (
    <div
      className="absolute top-1/2 left-1/2 h-full w-2/5 pointer-events-none flex justify-center items-center"
      style={{
        ...cardStyles,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
