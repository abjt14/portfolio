import clsx from "clsx";
import styles from "./styles.module.css";
import { data } from "./data";

function StarryBackground({ starCount = 100 }) {
  let count = starCount <= 1024 ? starCount : 1024;

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-50 pointer-events-none animate-fade-in-300">
      <div className="relative top-0 left-0 h-full w-full z-0">
        {Array.from({ length: count }).map((_, i) => {
          const { size, x, y, animationDuration } = data[i];
          return (
            <Star
              key={"star-" + i}
              size={size}
              x={x}
              y={y}
              animationDuration={animationDuration}
              className={i * 2 > count ? "hidden sm:block" : "block"}
            />
          );
        })}
      </div>
    </div>
  );
}

function Star({ size, x, y, animationDuration, className }) {
  return (
    <div
      id={`star-${x.toFixed(0)}-${y.toFixed(0)}`}
      className={clsx(
        "absolute rounded-full aspect-square bg-black dark:bg-white opacity-25 scale-150 dark:scale-100",
        styles.twinkle,
        className
      )}
      style={{
        width: size,
        height: size,
        top: `${y}%`,
        left: `${x}%`,
        animationDuration: `${animationDuration}ms`,
      }}
    />
  );
}

export default StarryBackground;
