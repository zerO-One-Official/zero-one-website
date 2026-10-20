import LoginBtn from "../button/LoginBtn";
import Logo from "../logo/Logo";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-[100] w-full border border-transparent bg-background transition-all">
      <div className="container-70 flex items-center justify-between py-3">
        <Logo size="default" />
        <div className="flex items-center gap-6">
          <DesktopNavigation />
          <MobileNavigation />
          <LoginBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
