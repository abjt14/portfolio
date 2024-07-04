import StarryBackground from "@/components/StarryBackground";
import DashedLine from "@/components/DashedLine";
import DownloadButton from "@/app/about/components/DownloadButton";
import WorkExperience from "@/app/about/components/WorkExperience";
import Education from "@/app/about/components/Education";
import MobileSocialLink from "@/components/MobileSocialLink";
import ImageBadge from "./components/ImageBadge";

export const metadata = {
  title: "About",
  description: "More about me and a deeper dive into my work experience.",
};

export default function About() {
  return (
    <>
      <main className="relative w-full flex justify-center items-start sm:items-center lg:items-start pt-16 sm:pt-8 lg:pt-[9.6875rem] pb-28 sm:pb-28 lg:pb-16 px-4 sm:px-8 xl:px-0">
        <div className="max-w-screen-sm w-full h-full flex flex-col gap-8 justify-start items-center relative">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
              <ImageBadge />
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-neutral-700 dark:text-neutral-200 font-medium">
                  Abhijeet Singh
                </h1>
                <p className="text-neutral-500 text-sm">Software Developer</p>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <DownloadButton />
            </div>
          </div>
          <div className="w-full flex flex-col justify-between items-center gap-2 text-neutral-700 dark:text-neutral-300 leading-7">
            <p className="w-full">
              Crafting engaging experiences for the Internet. With a creative
              approach to development, I add intuitiveness and life to my work.
              Outside of programming, I enjoy making 3D renders and animations.
            </p>
            <p className="w-full">
              My current tech stack is Next.js, Tailwind CSS, and Framer Motion.
              Right now, I&#39;m working on generative SVGs, learning how to
              build GLSL shaders, and exploring ideas for my next 3D project.
            </p>
          </div>
          <MobileSocialLinks />
          <div className="w-full relative hidden sm:block">
            <DashedLine direction="horizontal" className="top-0" />
          </div>
          <div className="w-full flex flex-col gap-4 text-neutral-700 dark:text-neutral-300 leading-7 relative">
            <WorkExperience />
          </div>
          <div className="w-full relative">
            <DashedLine
              direction="horizontal"
              className="top-0 hidden sm:block"
            />
            <DashedLine
              direction="horizontal"
              className="block sm:hidden top-0 left-1/2 -translate-x-1/2"
            />
          </div>
          <div className="w-full flex flex-col gap-4 text-neutral-700 dark:text-neutral-300 leading-7 relative">
            <Education />
          </div>
          <div className="block sm:hidden w-full relative">
            <DashedLine
              direction="horizontal"
              className="top-0 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </main>
      <StarryBackground starCount={256} />
    </>
  );
}

function MobileSocialLinks() {
  return (
    <div className="w-full grid sm:hidden grid-cols-4 relative">
      <DashedLine
        direction="horizontal"
        className="top-0 left-1/2 -translate-x-1/2"
      />
      <div className="aspect-square">
        <MobileSocialLink type="github" />
      </div>
      <div className="aspect-square">
        <MobileSocialLink type="linkedin" />
      </div>
      <div className="aspect-square">
        <MobileSocialLink type="codepen" />
      </div>
      <div className="aspect-square">
        <MobileSocialLink type="x" />
      </div>
      <DashedLine
        direction="horizontal"
        className="bottom-0 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
