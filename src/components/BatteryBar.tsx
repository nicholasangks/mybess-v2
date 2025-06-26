import React from "react";
import clsx from "clsx";

interface BatteryBarProps {
  percentage: number;
  width?: string;
  height?: string;
  className?: string;
}

export default function BatteryBar({
  percentage,
  width = "w-12",
  height = "h-1",
  className = "",
}: BatteryBarProps) {
  const bgColor =
    percentage < 10
      ? "bg-critical"
      : percentage < 30
      ? "bg-warning"
      : "bg-primary";

  return (
    <div
      className={clsx(
        "relative rounded-full overflow-hidden bg-muted",
        width,
        height,
        className
      )}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 rounded-full transition-all duration-300",
          bgColor
        )}
        style={{ width: `${percentage}%`, height: "100%" }}
      />
    </div>
  );
}
