import { useRef, useState } from "react";
import { DownArrowIcon, UpArrowIcon } from "../../icons/header";
import { MotionHeight } from "../../components/motion/MotionHeight";
import { AnimatePresence } from "framer-motion";
import { useClickOutside } from "../../hooks/useClickOutside";

const UserProfile = () => {
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => { setIsUserSettingsOpen(false); });

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
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Donde Salgo Logo"
          className="w-[1.5rem] sm:w-[2.5rem] aspect-square rounded-full object-cover shadow-s1"
        />
        <div>
          {isUserSettingsOpen ? (
            <UpArrowIcon className="w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem] fill-white" />
          ) : (
            <DownArrowIcon className="w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem] fill-white" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isUserSettingsOpen && (
          <MotionHeight className="absolute top-full mt-4 sm:mt-5 right-0 w-[7rem] sm:w-[10rem] bg-soft-white shadow-s2 rounded-xs z-50 overflow-hidden">
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