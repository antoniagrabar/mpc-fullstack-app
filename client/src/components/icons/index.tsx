import IconPath from "./iconPath";

export default function Icon({
  name,
  fill,
  width,
  height,
  stroke,
  className,
  viewBox,
}: {
  name: string;
  fill: string;
  width: number;
  height: number;
  stroke?: string;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox ? viewBox : `0 0 24 24`}
      fill={fill}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? className}
      stroke={stroke ? stroke : "#000"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <IconPath name={name} />
    </svg>
  );
}
