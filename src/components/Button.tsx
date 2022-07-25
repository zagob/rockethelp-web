import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color?: string;
}

export function Button({
  title,
  color = "bg-green-700",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${color} h-12 rounded-md transition-all hover:bg-green-500 w-full focus:border-green-500`}
      {...rest}
    >
      {title}
    </button>
  );
}
