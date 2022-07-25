import Image from "next/image";
import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, ...rest }: InputProps) {
  return (
    <div className="flex relative items-center">
      {icon}
      <input
        className="
        bg-gray-700
        w-full
        h-14 
        text-base 
        rounded-lg
        text-gray-100
        p-4
        pl-12
        border
        border-transparent
        focus:border-green-500 
        focus:bg-gray-700 
        focus:border 
        focus:outline-none
        placeholder:text-gray-300
        "
        type="text"
        {...rest}
      />
    </div>
  );
}
