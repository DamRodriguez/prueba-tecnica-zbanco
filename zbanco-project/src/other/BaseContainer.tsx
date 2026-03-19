import clsx from "clsx";
import MotionFade from "../components/motion/MotionFade";

type BaseContainerProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const BaseContainer = (props: BaseContainerProps) => {
  return (
    <MotionFade className="w-full h-full">
      <div className={clsx("bg-white border border-soft-gray rounded-md shadow-s2 h-full flex flex-col", props.className)}>
        {props.title && (
          <div className="shadow-s1 bg-gradient-to-t from-soft-gray/30 to-white rounded-t-md">
            <h3 className="text-dark-gray font-semibold text-lg p-4 sm:p-5">
              {props.title}
            </h3>
          </div>
        )}
        <div className="p-4 sm:p-5 h-full">
          {props.children}
        </div>
      </div>
    </MotionFade>
  );
};

export default BaseContainer;