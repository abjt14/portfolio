import Image from "next/image";

export default function ImageBadge() {
  return (
    <div className="rounded-full shadow-sm text-neutral-400 dark:text-neutral-600 border border-neutral-600 dark:border-neutral-400 shadow-neutral-400 dark:shadow-black relative">
      <Image
        src="/me.webp"
        alt="abhijeet singh's portrait photo"
        width={800}
        height={800}
        className="rounded-full size-16"
        priority
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[150%]"
      >
        <polygon
          points="84.64548246917326,64.35062871369087 64.35062871369087,84.64548246917326 35.64937128630913,84.64548246917326 15.354517530826747,64.35062871369087 15.35451753082674,35.64937128630913 35.64937128630911,15.354517530826755 64.35062871369088,15.354517530826755 84.64548246917325,35.64937128630911"
          strokeWidth="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="18s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon
          points="84.64548246917326,64.35062871369087 64.35062871369087,84.64548246917326 35.64937128630913,84.64548246917326 15.354517530826747,64.35062871369087 15.35451753082674,35.64937128630913 35.64937128630911,15.354517530826755 64.35062871369088,15.354517530826755 84.64548246917325,35.64937128630911"
          strokeWidth="0.5"
          transform="rotate(22.5 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="382.5 50 50"
            to="22.5 50 50"
            dur="18s"
            repeatCount="indefinite"
          />
        </polygon>
        <circle cx="50" cy="50" r="37.5" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="2 4">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="42.5"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
