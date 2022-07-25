import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Envelope, Key } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";

import Logo from "../../public/assets/logo.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { UserContextProvider } from "../contexts/ContextProviderUser";
import {
  auth,
  onAuthStateChanged,
  signIn,
  signOutUser,
} from "../services/firebase";

const Home: NextPage = () => {
  const { user } = useContext(UserContextProvider);
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(event: FormEvent) {
    event.preventDefault();

    signIn(email, password)
      .then((response) => {
        navigate.push("/home");
      })
      .catch((err: FirebaseError) => {
        if (err.code === "auth/invalid-email") {
          return alert("Email ou senha inválidos!");
        }

        if (err.code === "auth/wrong-password") {
          return alert("Email ou senha inválidos!");
        }

        if (err.code === "auth/user-not-found") {
          return alert("Email ou senha inválidos!");
        }
        alert("Preencha todos os campos");
        return;
      });
  }

  return (
    <div className="flex justify-center items-center p-12 border rounded-lg border-gray-400">
      <div className="w-64 flex flex-col items-center gap-10">
        <Image src={Logo} alt="Logo" />

        <form onSubmit={handleSignIn} className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-center">Acesse sua conta</h2>
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon={
              <Envelope
                className="text-gray-300 ml-4 absolute eft-0"
                size={22}
              />
            }
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            icon={
              <Key className="text-gray-300 ml-4 absolute eft-0" size={22} />
            }
          />
          <Button type="submit" title="Entrar" />
        </form>
      </div>
    </div>
  );
};

export default Home;
