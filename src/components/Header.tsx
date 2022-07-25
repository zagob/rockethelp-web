import Image from "next/image";
import { useRouter } from "next/router";
import { SignOut } from "phosphor-react";
import { useContext } from "react";
import logoHeader from "../../public/assets/logo-header.svg";
import { UserContextProvider } from "../contexts/ContextProviderUser";

export function Header() {
  const { onSignOut } = useContext(UserContextProvider);
  return (
    <div className="bg-gray-500 w-96 p-4 flex justify-between items-center">
      <Image src={logoHeader} alt="Logo do header" />
      <SignOut
        onClick={onSignOut}
        size={22}
        className="transition-all hover:text-gray-200 hover:cursor-pointer"
      />
    </div>
  );
}
