import useWindowBreakpoints from "./useWindowBreakpoints";

export default function useCardStyles({
  cardCount,
  globalScrollProgress,
  activeIndex,
  index,
  options,
}) {
  // the maximum number of cards that can be visible on either side of the active card
  const maxCardsOnOneSide = 5;

  const breakpoint = useWindowBreakpoints({
    isMobile: true,
  });

  const distanceIndex = Math.abs(activeIndex - index); // the distance of the card from the active card in terms of index

  function checkHidden() {
    if (distanceIndex > maxCardsOnOneSide) {
      return true;
    }
    return false;
  }
  const hidden = checkHidden();

  if (hidden) {
    return {
      display: "none",
    };
  }

  const relativeScrollPerCard = cardCount > 1 ? 1 / (cardCount - 1) : 1; // scroll amount per card normalized to a value between 0 and 1
  const cardRelativeScrollStart = relativeScrollPerCard * index; // the relative and normalized scroll position where the card starts
  const cardScrollProgress =
    (globalScrollProgress - cardRelativeScrollStart) / relativeScrollPerCard; // normalized relative scroll progress of the card
  const absoluteCardScrollProgress = Math.abs(cardScrollProgress); // absolute version of the card scroll progress
  const activeCardScrollProgress =
    globalScrollProgress / relativeScrollPerCard - activeIndex; // normalized relative scroll progress of the active card

  function calculateTranslateX() {
    if (!options.translateX.enabled) {
      return 0;
    }

    let translateX = 0;

    if (activeIndex === index) {
      if (absoluteCardScrollProgress < 0.5) {
        // we translate the card by 108/124 percent of its width when it is active and the scroll distance is less than half if its width
        translateX = cardScrollProgress * (breakpoint === "sm" ? -108 : -124);
      } else {
        // we translate the card by 108/124 percent of its width when it is active and the scroll distance is more than half if its width
        // we also add a slight offset to the translation so that when the card reaches the final position,
        // it is not completely centered, rather takes its final position as the card next or previous to the new active card
        translateX =
          Math.sign(cardScrollProgress) * (breakpoint === "sm" ? -108 : -124);
        translateX += cardScrollProgress * (breakpoint === "sm" ? 108 : 124);
        translateX +=
          -((1 - absoluteCardScrollProgress / cardCount / 4) * 11) *
          (absoluteCardScrollProgress - 0.5) *
          2 *
          Math.sign(cardScrollProgress);
      }
    } else {
      // if the card is not active, we translate it away from the center
      // based on the relative and normalized scroll distance from the active card
      translateX =
        cardScrollProgress *
        -((1 - absoluteCardScrollProgress / cardCount / 4) * 11);
    }

    return translateX;
  }

  function calculateTranslateZ() {
    if (!options.perspective.enabled) {
      return 0;
    }

    // translateZ adds a slight perspective effect to the cards when they are being rotated
    // the parent has it's own perspective value, so we need to adjust the translateZ value based on the scroll progress
    // to make the cards look like they are being rotated in a 3D space
    let translateZ = 200 - absoluteCardScrollProgress * 40;

    return translateZ;
  }

  function calculateRotateY() {
    if (!options.rotateY.enabled) {
      return 0;
    }

    let rotateY = 0;

    // we rotate the card based on the relative and normalized scroll distance from the active card
    // the maximum rotation is 75 degrees
    const absoluteActiveCardScrollProgress = Math.abs(activeCardScrollProgress);
    if (absoluteActiveCardScrollProgress < 0.5) {
      rotateY = absoluteActiveCardScrollProgress * -75;
    } else {
      rotateY = (1 - absoluteActiveCardScrollProgress) * -75;
    }

    if (index === activeIndex) {
      // the active card rotates more than the other cards when it is away from the center
      if (absoluteCardScrollProgress < 0.5) {
        rotateY = absoluteCardScrollProgress * -90;
      } else {
        rotateY = (1 - absoluteCardScrollProgress) * -90;
      }
    }

    // the further the card is from the active card, the less it rotates
    rotateY *=
      Math.sign(activeCardScrollProgress) * (1 - distanceIndex / cardCount);

    return rotateY;
  }

  function calculateRotateZ() {
    // slight rotation around the z-axis to make them previewable
    let rotateZ = cardScrollProgress * 2 * -1;

    return rotateZ;
  }

  // we may need to ease the value of scale to make the animation near the center more fluid
  function calculateScale() {
    if (!options.scale.enabled) {
      // check notes below
      return options.perspective.enabled ? 1 : 1.3525;
    }

    // cards scale down as they move away from the active card
    // when we use perspective in css, we also change the size of the cards
    // so to make it look like they dont change size on swithcing it on/off as we do in the demo
    // we adjust the scale value so that the new size also matches the old one perfectly
    let scale = options.perspective.enabled
      ? 1
      : 1.3525 - absoluteCardScrollProgress * 0.05;

    // the active card scales down more than the other cards when it moves away from the center
    if (index === activeIndex) {
      if (absoluteCardScrollProgress < 0.5) {
        scale -= absoluteCardScrollProgress * 0.25;
      } else {
        scale -= (1 - absoluteCardScrollProgress) * 0.25;
      }
    }

    if (scale < 0) {
      scale = 0;
    }

    return scale;
  }

  function calculateZIndex() {
    if (!options.zIndex.enabled) {
      return 0;
    }

    let zIndex = cardCount - distanceIndex; // the further the card is from the active card, the less the z-index

    // normally the cards at equal distance from the active card should have the same z-index
    // so we switch the z-index of the cards based on the scroll direction
    // this is so that the cards that are visible when the active card is moved in either direction need to be on top
    if (Math.sign(activeCardScrollProgress) === -1) {
      if (index < activeIndex) {
        zIndex += 1;
        if (activeCardScrollProgress < -0.5) {
          zIndex += 1;
        }
      }
    }
    if (Math.sign(activeCardScrollProgress) === 1) {
      if (index === activeIndex) {
        zIndex += 1;
      }
      if (index > activeIndex) {
        zIndex += 1;
        if (activeCardScrollProgress > 0.5) {
          zIndex += 1;
        }
      }
    }

    return zIndex;
  }

  function calculateOpacity() {
    // the further the card is from the active card, the less the opacity
    // the cards with index difference of more than maxCardsOnOneSide from the center have 0 opacity
    // they fade in as they move towards the center, and fade out as they move away from the center
    let opacity = maxCardsOnOneSide - absoluteCardScrollProgress;

    if (opacity < 0) {
      opacity = 0;
    }
    if (opacity > 1) {
      opacity = 1;
    }

    return opacity;
  }

  const zIndex = calculateZIndex();
  const translateX = calculateTranslateX();
  let translateZ = calculateTranslateZ();
  let rotateY = calculateRotateY();
  let rotateZ = calculateRotateZ();
  const scale = calculateScale();
  const opacity = calculateOpacity();

  let cardStyles = {
    transform: `translateX(${
      translateX - 50
    }%) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
    zIndex,
    opacity,
  };

  return cardStyles;
}
