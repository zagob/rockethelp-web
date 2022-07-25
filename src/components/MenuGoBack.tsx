import { useRouter } from "next/router";
import { ArrowArcLeft, ArrowLeft } from "phosphor-react";

export function MenuGoBack() {
  const router = useRouter();
  return (
    <div className="bg-gray-400 font-bold flex items-center justify-center relative w-96 p-4">
      <ArrowLeft
        size={22}
        className="absolute left-4 transition-all hover:cursor-pointer hover:opacity-50"
        onClick={() => router.back()}
      />
      <span>Solicitação</span>
    </div>
  );
}
