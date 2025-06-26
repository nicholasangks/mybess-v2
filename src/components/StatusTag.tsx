import React from "react";
import clsx from "clsx";

interface StatusTagProps {
  status: "Connected" | "Disconnected" | "Critical" | "Major" | "Warning" | "Normal" | "Idle" | "Idle2";
  className?: string;
}

const statusColors: Record<StatusTagProps["status"], string> = {
  Critical: "bg-[#FF4714]/20",
  Major: "bg-[#FFA500]/20",
  Warning: "bg-[#C5A0FB]/20",
  Normal: "bg-muted",
  Connected: "bg-[#009439]/20",
  Disconnected: "bg-gray-200",
  Idle: "bg-muted",
  Idle2: "bg-muted",
};

export default function StatusTag({ status, className = "" }: StatusTagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 h-[1.4rem] rounded-full text-sx text-muted-foreground",
        statusColors[status],
        className
      )}
    >
      {status}
    </span>
  );
}
