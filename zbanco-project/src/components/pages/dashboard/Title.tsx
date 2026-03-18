type TitleProps = {
  title: string;
}

const Title = (props: TitleProps) => {
  return (
    <p className="text-xs sm:text-lg text-center font-semibold text-medium-gray">
      {props.title}
    </p>
  );
};

export default Title;