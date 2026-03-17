export type SpinnerProps = {
  size?: number;
  color?: string;
  borderWidth?: number;
};

const Spinner = ({ size = 4, color = "#fff", borderWidth = 0.35 }: SpinnerProps) => {
  return (
    <div
      className="animate-spin"
      style={{
        width: `${String(size)}rem`,
        height: `${String(size)}rem`,
        borderWidth: `${String(borderWidth)}rem`,
        borderColor: color,
        borderTopColor: "transparent",
        borderRadius: 999,
      }}
    />
  );
};

export default Spinner;
