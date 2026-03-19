import clsx from "clsx";
import MotionFade from "../components/motion/MotionFade";

type BaseContainerProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BaseContainer = (props: BaseContainerProps) => {
  return (
    <MotionFade className="w-full h-full">
      <div className={clsx("bg-white border border-soft-gray rounded-md shadow-s2 h-full flex flex-col", props.className)}>
        <div className="bg-soft-gray/15 shadow-s1">
          <h3 className="text-dark-gray font-semibold text-lg p-4">
            {props.title}
          </h3>
        </div>
        <div className="p-5 h-full">
          {props.children}
        </div>
      </div>
    </MotionFade>
  );
};

export default BaseContainer;