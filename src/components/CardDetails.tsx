import { IconProps } from "phosphor-react";
import { ReactNode } from "react";

interface CardDetailsProps {
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
}

export function CardDetails({
  title,
  description,
  footer,
  icon: Icon,
  children,
}: CardDetailsProps) {
  return (
    <div className="p-4 mt-4 bg-gray-500 rounded-md w-96">
      <div className="flex items-center gap-4 mb-2">
        <Icon size={22} className="text-primary" />
        <span className="uppercase text-gray-300 font-bold text-sm">
          {title}
        </span>
      </div>

      <p>{description}</p>

      {!!footer && (
        <span className="text-gray-300 text-sm">{`Registrado em ${footer}`}</span>
      )}

      {children}
    </div>
  );
}
