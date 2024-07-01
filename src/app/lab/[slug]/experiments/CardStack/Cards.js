"use client";

import React from "react";
import Link from "next/link";
import useCardStyles from "./hooks/useCardStyles";
import clsx from "clsx";

export default function CardStack({ children, options = {} }) {
  // when a component is provided children using multiple instances of map(),
  // react treats the children as an array of arrays, so we need to flatten it
  // to get the correct count of children and to be able to access them by index.
  const cardChildren = React.Children.toArray(children);
  const cardCount = React.Children.count(cardChildren);

  const scrollableContainerRef = React.useRef(null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [globalScrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    if (!scrollableContainerRef.current) return;
    const container = scrollableContainerRef.current;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const newScrollProgress = scrollLeft / (scrollWidth - clientWidth); // normalized to a value between 0 and 1
      setScrollProgress(newScrollProgress);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex, cardCount]);

  React.useEffect(() => {
    const relativeScrollPerCard = 1 / (cardCount - 1); // scroll amount per card normalized to a value between 0 and 1

    // the relative and normalized scroll position where the previous and next card starts
    const previousScrollSnapPoint = relativeScrollPerCard * (activeIndex - 1);
    const nextScrollSnapPoint = relativeScrollPerCard * (activeIndex + 1);

    // increment or decrement the active index when the scroll position reaches the previous or the next card
    if (globalScrollProgress <= previousScrollSnapPoint && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (
      globalScrollProgress >= nextScrollSnapPoint &&
      activeIndex < cardCount - 1
    ) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, cardCount, globalScrollProgress]);

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
              {cardCount > 1 ? cardChildren[index] : cardChildren}
            </VisibleCard>
          );
        })}
      </div>
    </div>
  );
}

function ScrollableCard({ index }) {
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
}) {
  let cardStyles = useCardStyles({
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
