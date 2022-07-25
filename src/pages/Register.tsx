import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import Layout from "../layouts/Layout";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useRouter } from "next/router";

export default function Register() {
  const navigate = useRouter();
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  async function handleRegister() {
    const t = await addDoc(collection(db, "orders"), {
      patrimony,
      description,
      status: "open",
      created_at: serverTimestamp(),
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((e) => {
        return console.log("err");
      })
      .finally(() => {
        navigate.push("/home");
      });
    console.log("teste", t);
  }

  return (
    <Layout>
      <div className="bg-gray-400 p-4 flex flex-col gap-4">
        <Input
          onChange={(e) => setPatrimony(e.target.value)}
          value={patrimony}
          placeholder="Número do patrimonio"
        />
        <textarea
          placeholder="Descrição do problema"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="
        bg-gray-700
        w-full
        max-h-[400px]
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
          rows={70}
        />
        <Button type="button" title="Cadastrar" onClick={handleRegister} />
      </div>
    </Layout>
  );
}
