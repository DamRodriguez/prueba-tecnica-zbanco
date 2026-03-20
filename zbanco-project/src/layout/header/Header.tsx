import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../other/LanguageDropdown";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center px-[1.5rem] sm:px-[2.5rem] py-[0.8rem] sm:py-[1rem] shadow-s2 sticky top-0 z-800 gap-5 bg-gradient-to-t from-medium-blue to-blue-dark">
      <span className="flex-1 text-base sm:text-2xl font-bold text-white">
        {t("layout.header.title")}
      </span>
      <LanguageDropdown />
    </header>
  );
};

export default Header;
