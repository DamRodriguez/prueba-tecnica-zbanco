import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import { DashboardIcon, HomeIcon } from "../icons/nav";
import { useTranslation } from "react-i18next";

interface NavItem {
  id: number;
  text: string;
  path: string;
  icon: React.ReactElement;
}

const navClasses = {
  active: {
    link: "bg-blue-soft/20 shadow-s1",
  },
  inactive: {
    link: "bg-transparent",
  },
};

const Nav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { id: 0, text: t("layout.nav.routes.home"), path: routes.pages.home, icon: <HomeIcon /> },
    { id: 1, text: t("layout.nav.routes.dashboard"), path: routes.pages.dashboard, icon: <DashboardIcon /> },
  ];

  const activeItemId = navItems.find(item =>
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
  )?.id;

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="w-fit h-screen fixed z-10 shadow-s3 bg-[linear-gradient(0deg,#1a184f,var(--color-blue-dark))]">
      <ul className="flex flex-col">
        {navItems.map(item => {
          const current = activeItemId === item.id ? navClasses.active : navClasses.inactive;

          return (
            <li key={item.id} className="flex items-center">
              <button
                onClick={() => handleNavClick(item.path)}
                className={clsx(
                  "text-xs sm:text-base font-medium flex justify-center items-center p-[0.6rem] px-[1rem] sm:px-[2rem] w-full cursor-pointer hover:bg-blue-soft/10 text-white",
                  current.link
                )}
              >
                <div className="flex sm:hidden">
                  {item.icon}
                </div>
                <div className="sm:flex hidden">
                  {item.text}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;