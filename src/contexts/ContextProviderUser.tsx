import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, signIn, signOutUser } from "../services/firebase";

interface UserContextProviderProps {
  user: {};
  onSignInEmailAndPassword: (email: string, password: string) => void;
  onSignOut: () => void;
}

export const UserContextProvider = createContext(
  {} as UserContextProviderProps
);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const navigate = useRouter();
  const [user, setUser] = useState({});

  async function onSignInEmailAndPassword(email: string, password: string) {
    signIn(email, password)
      .then((response) => {
        const { email, displayName, phoneNumber, photoURL } = response.user;
        setUser({ email, displayName, phoneNumber, photoURL });
        navigate.push("/home");
      })
      .catch((err) => alert(err));
  }

  function onSignOut() {
    signOutUser();
  }

  useEffect(() => {
    const register = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate.push("/home");
        return;
      }

      navigate.push("/");
    });

    return register;
  }, [user]);
  return (
    <UserContextProvider.Provider
      value={{ user, onSignInEmailAndPassword, onSignOut }}
    >
      {children}
    </UserContextProvider.Provider>
  );
}
