import HeaderNavigation from "./HeaderNavigation";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-slate-200 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <HeaderNavigation />
      </div>
    </header>
  );
}
