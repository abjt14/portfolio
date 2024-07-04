import Name from "@/app/components/Name";
import Clock from "@/app/components/Clock";
import VideoLink from "@/app/components/VideoLink";
import DashedLine from "@/components/DashedLine";
import MobileSocialLink from "@/components/MobileSocialLink";

export default function Home() {
  return (
    <main className="relative min-h-svh flex justify-center w-full items-start sm:items-center lg:items-start pt-14 sm:pt-0 lg:pt-[6.75rem] pb-28 sm:pb-16 lg:pb-0 px-4 sm:px-8 md:px-20 lg:px-0">
      <div className="relative h-full w-full max-w-screen-md flex flex-col justify-start items-center gap-0">
        <div className="h-32 w-full flex justify-between items-center">
          <div className="hidden sm:block h-full w-32 p-0.5 relative">
            <VideoLink
              slug="hold-to-submit"
              className="opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-400"
            />
          </div>
          <div className="hidden lg:block h-full w-32 relative">
            <DashedLine direction="vertical" className="left-0 block" />
          </div>
          <div className="flex-1 h-full px-3 md:px-0 flex justify-center items-center relative">
            <div className="text-neutral-500 text-center">
              Crafting{" "}
              <span className="text-neutral-950 dark:text-neutral-50">
                engaging experiences
              </span>
              <br />
              for the internet
            </div>
            <DashedLine
              direction="vertical"
              className="hidden sm:block left-0"
            />
            <DashedLine
              direction="vertical"
              className="hidden sm:block right-0"
            />
          </div>
          <div className="h-full w-32 relative hidden lg:block">
            <DashedLine direction="vertical" className="right-0 block" />
          </div>
          <div className="hidden sm:block h-full w-32 p-0.5 relative">
            <VideoLink
              slug="radio-input"
              variant="square"
              className="opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-300"
            />
          </div>
        </div>
        <div className="h-auto sm:h-32 w-full flex justify-center items-center relative overflow-hidden">
          <DashedLine direction="horizontal" className="top-0 left-0" />
          <Name />
          <DashedLine direction="horizontal" className="bottom-0 right-0" />
        </div>
        <div className="h-32 w-full flex justify-between items-center relative">
          <div className="hidden sm:grid h-full w-32 grid-rows-2 relative">
            <div className="relative">
              <DashedLine direction="horizontal" className="bottom-0" />
            </div>
            <Clock />
          </div>
          <div className="flex-1 h-full flex justify-center items-center px-3 md:px-7 relative">
            <span className="text-neutral-500 text-center text-balance">
              With a creative approach to development,
              <br className="block sm:hidden md:block" /> I add intuitiveness
              and life to my work.
            </span>
            <DashedLine
              direction="vertical"
              className="hidden sm:block left-0"
            />
            <DashedLine
              direction="vertical"
              className="hidden sm:block right-0"
            />
          </div>
          <div className="hidden sm:grid h-full w-32 grid-rows-2 relative">
            <div className="flex flex-col font-medium justify-center items-center text-sm font-geistmono">
              <span>DEVELOPER</span>
              <span className="text-neutral-500">Portfolio</span>
            </div>
            <div className="relative">
              <DashedLine direction="horizontal" className="top-0" />
            </div>
          </div>
          <DashedLine direction="horizontal" className="bottom-0 sm:bottom-0" />
        </div>
        <div className="h-auto w-full flex flex-col sm:grid sm:grid-cols-4 lg:grid-cols-6 gap-0 relative">
          <div className="h-32 hidden sm:block"></div>
          <div className="h-32 hidden lg:block"></div>
          <div className="block col-span-2 row-span-2 sm:flex items-center p-0.5 relative">
            <VideoLink
              slug="polyrhythmic-rings"
              className="opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-100"
            />
            <DashedLine
              direction="vertical"
              className="hidden sm:block top-0 -left-px"
            />
            <DashedLine
              direction="vertical"
              className="hidden sm:block top-0 -right-px"
            />
          </div>
          <div className="h-auto sm:h-32 sm:hidden lg:block py-8 sm:py-0 relative">
            <div className="grid sm:hidden grid-cols-2">
              <Clock />
              <div className="flex flex-col justify-center items-center font-geistmono">
                <span>DEVELOPER</span>
                <span className="text-neutral-500">Portfolio</span>
              </div>
            </div>
            <DashedLine
              direction="vertical"
              className="block sm:hidden top-0 left-1/2"
            />
            <DashedLine
              direction="horizontal"
              className="block sm:hidden top-0"
            />
            <DashedLine
              direction="horizontal"
              className="block sm:hidden bottom-0"
            />
          </div>
          <div className="h-auto w-auto sm:h-32 sm:w-32 justify-self-auto sm:justify-self-end relative">
            <div className="grid grid-cols-2 gap-0 sm:block">
              <div className="p-0.5">
                <VideoLink
                  slug="card-stack"
                  className="block sm:hidden opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-400"
                />
                <VideoLink
                  slug="magnetic-button"
                  variant="square"
                  className="hidden sm:block opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-400"
                />
              </div>
              <div></div>
            </div>
            <DashedLine
              direction="vertical"
              className="top-0 left-1/2 sm:-left-px"
            />
            <DashedLine
              direction="vertical"
              className="block sm:hidden left-1/2"
            />
            <DashedLine
              direction="horizontal"
              className="block sm:hidden bottom-0"
            />
          </div>
          <div className="h-auto w-auto sm:h-32 sm:w-32 justify-self-start pb-px relative">
            <div className="grid grid-cols-2 gap-px sm:block">
              <div></div>
              <div className="p-0.5">
                <VideoLink
                  slug="card-stack"
                  className="hidden sm:block opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-500"
                />
                <VideoLink
                  slug="magnetic-button"
                  variant="square"
                  className="block sm:hidden opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-400"
                />
              </div>
            </div>
            <DashedLine
              direction="vertical"
              className="hidden sm:block top-0 -right-px"
            />
            <DashedLine
              direction="vertical"
              className="block sm:hidden left-1/2"
            />
            <DashedLine
              direction="horizontal"
              className="block sm:hidden bottom-0"
            />
          </div>
          <div className="h-auto sm:h-32 relative">
            <div className="grid grid-cols-2 sm:hidden">
              <div className="p-0.5">
                <VideoLink
                  slug="hold-to-submit"
                  className="opacity-100 sm:opacity-0 sm:animate-fade-zoom-in-300 !animation-delay-400"
                />
              </div>
              <div></div>
            </div>
            <DashedLine
              direction="horizontal"
              className="block sm:hidden -bottom-px sm:bottom-0"
            />
          </div>
          <div className="grid sm:hidden grid-cols-4">
            <div className="aspect-square relative">
              <MobileSocialLink type="github" />
              <DashedLine direction="vertical" className="top-0 -right-px" />
            </div>
            <div className="aspect-square relative">
              <MobileSocialLink type="linkedin" />
              <DashedLine direction="vertical" className="top-0 -right-px" />
            </div>
            <div className="aspect-square relative">
              <MobileSocialLink type="codepen" />
              <DashedLine direction="vertical" className="top-0 -right-px" />
            </div>
            <div className="aspect-square relative">
              <MobileSocialLink type="x" />
            </div>
          </div>
          <div className="hidden lg:block h-32"></div>
          <div className="hidden lg:block h-32"></div>
          <DashedLine
            direction="horizontal"
            className="hidden sm:block top-[calc(50%-0.5px)]"
          />
        </div>
        <DashedLine
          direction="vertical"
          className="-left-px top-1/2 -translate-y-1/2"
          gradient
        />
        <DashedLine
          direction="vertical"
          className="-right-px top-1/2 -translate-y-1/2"
          gradient
        />
        <DashedLine
          direction="horizontal"
          className="-top-px left-1/2 -translate-x-1/2"
          gradient
        />
        <DashedLine
          direction="horizontal"
          className="-bottom-px left-1/2 -translate-x-1/2"
          gradient
        />
      </div>
    </main>
  );
}
