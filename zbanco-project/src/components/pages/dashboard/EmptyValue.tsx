type EmptyValueProps = {
  value: string | number;
}

const EmptyValue = (props: EmptyValueProps) => {
  return (
    <div className="text-base sm:text-2xl font-semibold text-medium-gray">
      {props.value}
    </div>
  );
};

export default EmptyValue;