import LanguageDropdown from "../../other/LanguageDropdown";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-[1.5rem] sm:px-[2.5rem] py-[0.8rem] sm:py-[1rem] shadow-s2 sticky top-0 bg-blue-dark z-30 gap-5">
      <span className="flex-1 text-base sm:text-2xl font-bold text-white">
        Simulador de transferencias
      </span>
      <LanguageDropdown />
    </header>
  );
};

export default Header;
