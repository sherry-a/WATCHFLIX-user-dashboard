"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";

const Toastr = ({ message, type = "success" }: IToastrProps) => {
  const [showToastr, setShowToastr] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setShowToastr(false);
    }, 3000);
  }, []);
  return (
    <div
      className={`flex justify-start items-center z-10 fixed right-5 top-10 min-h-[80px] h-auto w-auto p-5 rounded-md animate-bounce text-white font-bold ${
        setColors[type]
      } ${showToastr ? "block" : "hidden"}`}
    >
      <p className="m-0">{message}!</p>
    </div>
  );
};
const setColors: Record<string, string> = {
  error: "bg-red-700",
  success: "bg-green-700",
  warning: "bg-yellow-600",
};
interface IToastrProps extends HTMLAttributes<HTMLDivElement> {
  type?: "error" | "success" | "warning";
  message: string;
}

export default Toastr;
