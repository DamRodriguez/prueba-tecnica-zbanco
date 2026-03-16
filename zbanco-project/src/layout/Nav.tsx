import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";

interface NavItem {
  id: number;
  text: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 0, text: "Inicio", path: routes.pages.home },
  { id: 1, text: "Dashboard", path: routes.pages.dashboard },
];

const navClasses = {
  active: {
    link: "bg-blue/20 shadow-s1",
  },
  inactive: {
    link: "bg-transparent",
  },
};

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeItemId = navItems.find(item =>
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
  )?.id;

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="bg-soft-gray/20 w-fit h-screen fixed z-10 shadow-s3">
      <ul className="flex flex-col">
        {navItems.map(item => {
          const current = activeItemId === item.id ? navClasses.active : navClasses.inactive;

          return (
            <li key={item.id} className="flex items-center">
              <button
                onClick={() => handleNavClick(item.path)}
                className={clsx(
                  "text-xs sm:text-base leading-[1.3125rem] p-[0.6rem] px-[1.5rem] sm:px-[2rem] w-full cursor-pointer hover:bg-black/10",
                  current.link
                )}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;