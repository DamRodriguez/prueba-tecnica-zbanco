import clsx from "clsx";

type SmallContainerProps = {
  children: React.ReactNode;
  className?: string;
}

const SmallContainer = (props: SmallContainerProps) => {
  return (
    <div className={clsx("bg-white shadow-s2 rounded-md p-5 flex flex-col gap-4 sm:gap-5", props.className)}>
      {props.children}
    </div>
  );
};

export default SmallContainer;