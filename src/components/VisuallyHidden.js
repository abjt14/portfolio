// josh w comeau's VisuallyHidden component

// These styles will make sure the component
// is not visible, but will still be announced
// by screen readers.
//
// Adding “display: none” would hide the
// element from ALL users, including those
// using screen-readers.
const hiddenStyles = {
  clip: "rect(0 0 0 0)",
};

export default function VisuallyHidden({ children }) {
  return (
    <span
      className="inline-block absolute overflow-hidden h-px w-px -m-px p-0 border-0 touch-none select-none"
      style={hiddenStyles}
    >
      {children}
    </span>
  );
}
