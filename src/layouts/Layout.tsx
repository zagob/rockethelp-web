import { HtmlHTMLAttributes, ReactNode } from "react";
import { MenuGoBack } from "../components/MenuGoBack";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-[600px] bg-gray-400">
      <MenuGoBack />
      <main>{children}</main>
    </div>
  );
}
