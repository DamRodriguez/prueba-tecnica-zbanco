import { useEffect, useRef, useState } from "react";
import profileImage from "../../assets/images/mainUser.png";
import { DownArrowIcon, UpArrowIcon } from "../../icons/header";
import { MotionHeight } from "../../components/motion/MotionHeight";
import { AnimatePresence } from "framer-motion";

const UserProfile = () => {
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsUserSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const settingsOptions = [
    { text: "Ver perfil" },
    { text: "Ajustes" },
    { text: "Cerrar sesión" }
  ];

  return (
    <div
      ref={containerRef}
      className="cursor-pointer relative"
    >
      <div onClick={() => setIsUserSettingsOpen(!isUserSettingsOpen)} className="flex items-center gap-2">
        <img
          src={profileImage}
          alt="Donde Salgo Logo"
          className="w-[2rem] sm:w-[2.5rem] aspect-square rounded-full object-cover shadow-s1"
        />
        <div>
          {isUserSettingsOpen ? (
            <UpArrowIcon className="w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem]" />
          ) : (
            <DownArrowIcon className="w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem]" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isUserSettingsOpen && (
          <MotionHeight className="absolute top-full mt-4 right-0 w-[7rem] sm:w-[10rem] bg-soft-white shadow-s2 rounded-xs z-50 overflow-hidden">
            {settingsOptions.map((item, index) => (
              <p
                key={index}
                className="text-xs sm:text-base px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-black/10 transition-all duration-300 ease-in-out"
              >
                {item.text}
              </p>
            ))}
          </MotionHeight>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;