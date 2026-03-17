import { AnimatePresence } from "framer-motion";
import { type JSX, useRef, useState } from "react";
import { ArgFlagIcon, DownIcon, EngFlagIcon, UpIcon } from "../icons/languageDropdown";
import clsx from "clsx";
import useBreakpoint from "../hooks/useBreakpoint";
import { MotionHeight } from "../components/motion/MotionHeight";
import { useClickOutside } from "../hooks/useClickOutside";
import type { Locale } from "../i18n/i18n";
import i18n from "../i18n/i18n";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const isMobile = useBreakpoint();

  const Languages: { lang: Locale; flag: JSX.Element }[] = [
    { lang: "es", flag: <ArgFlagIcon className="w-5 h-5 sm:w-7 sm:h-7" /> },
    { lang: "en", flag: <EngFlagIcon className="w-5 h-5 sm:w-7 sm:h-7" /> },
  ];

  const selectedLang: Locale = (i18n.language as Locale) ?? Languages[0].lang;

  const currentLanguage = Languages.find(l => l.lang === selectedLang) ?? Languages[0];
  const othersLanguages = Languages.filter(l => l.lang !== currentLanguage.lang);

  const handleLanguageChange = (newLang: Locale) => {
    i18n.changeLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div
      {...(!isMobile && {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      })}
      ref={dropdownRef}
      className="inline-block max-h-[2rem] sm:max-h-[2.5rem] w-[4.5rem] sm:w-[5.7rem] z-40"
    >
      <div className={clsx(
        "py-[0.4rem] px-[0.3rem] sm:px-[0.5rem] rounded-[0.5rem] overflow-hidden transition-all duration-400 ease-in-out",
        { "bg-blue-dark": isOpen, "bg-soft-gray/10": !isOpen }
      )}>
        <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-[0.6rem] cursor-pointer">
          <div className="flex items-center gap-[0.3rem]">
            <div className="bg-black rounded-full">{currentLanguage.flag}</div>
            <span className="capitalize text-xs sm:text-base text-soft-white">{currentLanguage.lang}</span>
          </div>
          {isOpen ? <UpIcon className="w-2 h-2 sm:w-[0.6rem] sm:h-[0.6rem]" /> :
            <DownIcon className="w-2 h-2 sm:w-[0.6rem] sm:h-[0.6rem]" />}
        </div>

        <AnimatePresence>
          {isOpen && (
            <MotionHeight>
              <div className="flex flex-col gap-[0.6rem] pt-[0.6rem]">
                {othersLanguages.map(({ lang, flag }) => (
                  <div
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="group flex items-center gap-[0.3rem] cursor-pointer hover:bg-soft-gray/20 rounded-full transition-all duration-400 ease-in-out"
                  >
                    {flag}
                    <span className="capitalize text-xs sm:text-base text-soft-white/70 group-hover:text-soft-white">{lang}</span>
                  </div>
                ))}
              </div>
            </MotionHeight>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageDropdown;