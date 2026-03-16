import { MessagesIcon, NotificationIcon } from "../../icons/header";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-[1.5rem] sm:px-[2rem] py-[0.75rem] shadow-s2 sticky top-0 bg-blue-dark z-30 gap-5">
      <span className="flex-1 text-base sm:text-2xl font-bold text-white">
        Simulador de transferencias
      </span>
      <div className="flex justify-center items-center gap-5 sm:gap-7">
        <div className="cursor-pointer">
          <NotificationIcon className="w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem]" />
        </div>
        <div className="cursor-pointer">
          <MessagesIcon className="w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem]" />
        </div>
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
