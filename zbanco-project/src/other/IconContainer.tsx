type IconContainerProps = {
  children: React.ReactNode;
}

const IconContainer = (props: IconContainerProps) => {
  return (
    <div className=" [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5 grid place-items-center rounded-full rounded-br-md h-[2.5rem] aspect-square shadow-s1 bg-soft-gray/10">
      {props.children}
    </div>
  );
};

export default IconContainer;