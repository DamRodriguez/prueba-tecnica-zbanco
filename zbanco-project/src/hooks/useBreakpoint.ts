import { useEffect, useState } from "react";
import config from "../config/config";

const useBreakpoint = (breakpoint = Number(config.breakpoints.md)) => {
  const [isBreakpoint, setIsBreakpoint] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBreakpoint(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); };
  }, [breakpoint]);

  return isBreakpoint;
};

export default useBreakpoint;
