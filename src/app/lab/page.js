import Masonry from "@/app/lab/components/Masonry";

export const metadata = {
  title: "Lab",
  description: "A collection of my experiments and projects.",
};

export default function Lab() {
  return (
    <main className="relative w-full flex justify-center items-start sm:items-center lg:items-start pt-4 sm:pt-8 lg:py-[7.75rem] pb-28 sm:pb-28 md:pb-16 lg:pb-16 px-4 sm:px-8 md:px-20 xl:px-0">
      <div className="max-w-screen-xl w-full h-full">
        <Masonry />
      </div>
    </main>
  );
}
