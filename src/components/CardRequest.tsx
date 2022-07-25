import { useRouter } from "next/router";
import { CircleWavyCheck, ClockAfternoon, Hourglass } from "phosphor-react";
import { HtmlHTMLAttributes } from "react";

interface CardRequestProps extends HtmlHTMLAttributes<HTMLDivElement> {
  status: "open" | "closed";
  title: string;
  date: string | undefined;
}

export function CardRequest({
  status,
  title,
  date,
  ...rest
}: CardRequestProps) {
  return (
    <div
      className={`
      ${status === "open" ? "border-l-secondary" : "border-l-green-300"}
      rounded-md 
      border-l-8 
      p-2 
      bg-gray-600 
      flex 
      items-center 
      justify-between 
      px-4 
      transition-colors 
      hover:cursor-pointer 
      hover:bg-gray-500 
      mt-2
    `}
      {...rest}
    >
      <div>
        <span className="text-gray-100 font-bold">{title}</span>
        <p className="flex items-center text-gray-200 gap-2">
          <ClockAfternoon size={18} /> {date}
        </p>
      </div>
      <div className="bg-gray-400 flex justify-center items-center w-12 h-12 rounded-full">
        {status === "open" ? (
          <Hourglass className="text-secondary" size={30} />
        ) : (
          <CircleWavyCheck className="text-green-300" size={30} />
        )}
      </div>
    </div>
  );
}
