import clsx from "clsx";

type BaseContainerProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BaseContainer = (props: BaseContainerProps) => {
  return (
    <div className={clsx("bg-white border border-soft-gray rounded-md shadow-s2", props.className)}>
      <div className="bg-soft-gray/15 shadow-s1">
        <h3 className="text-dark-gray font-semibold text-lg p-4 ">
          {props.title}
        </h3>
      </div>
      <div className="p-5">
        {props.children}
      </div>
    </div>
  );
};

export default BaseContainer;