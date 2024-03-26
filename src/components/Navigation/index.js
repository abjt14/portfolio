import MainMenu from "./MainMenu";
import SocialMenu from "./SocialMenu";
import SoundControl from "./SoundControl";
import ThemeControl from "./ThemeControl";

export default function Navigation() {
  return (
    <nav className="fixed bottom-8 lg:top-8 left-1/2 -translate-x-1/2 h-fit w-auto max-w-screen-lg z-50 flex justify-center items-center gap-2 md:gap-4 flex-nowrap">
      <MainMenu />
      <SocialMenu />
      <SoundControl />
      <ThemeControl />
    </nav>
  );
}
