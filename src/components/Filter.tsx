import { ButtonHTMLAttributes } from "react";

interface FilterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isActive: boolean;
  typeStatus: "open" | "closed";
}

export function Filter({ title, isActive, typeStatus, ...rest }: FilterProps) {
  return (
    <button
      className={`${
        isActive && typeStatus === "open"
          ? "text-secondary border-secondary"
          : isActive && typeStatus === "closed"
          ? "text-green-300 border-green-300"
          : "text-gray-300 border-gray-600"
      } 
      border
       py-1 my-4 bg-gray-600 rounded-md w-full uppercase text-sm`}
      {...rest}
    >
      {title}
    </button>
  );
}
