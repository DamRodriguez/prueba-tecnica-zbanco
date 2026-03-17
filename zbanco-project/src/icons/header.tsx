import clsx from "clsx";

export const DownArrowIcon = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20">
      <path fill="#fff" d="M10.103 12.778L16.81 6.08a.69.69 0 0 1 .99.012a.726.726 0 0 1-.012 1.012l-7.203 7.193a.69.69 0 0 1-.985-.006L2.205 6.72a.727.727 0 0 1 0-1.01a.69.69 0 0 1 .99 0l6.908 7.068Z" />
    </svg>
  );
};

export const UpArrowIcon = ({ className }: { className: string }) => {
  return (
    <DownArrowIcon
      className={clsx("rotate-180", className)}
    />
  );
};