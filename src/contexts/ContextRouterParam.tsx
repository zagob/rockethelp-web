import { createContext, ReactNode, useState } from "react";

interface ContextRouterParamProviderProps {
  id: string;
  onGetId: (id: string) => void;
}

export const ContextRouterParamProvider = createContext(
  {} as ContextRouterParamProviderProps
);

interface RouterParamProviderParams {
  children: ReactNode;
}

export function RouterParamProvider({ children }: RouterParamProviderParams) {
  const [id, setId] = useState("");

  function onGetId(id: string) {
    setId(id);
  }
  return (
    <ContextRouterParamProvider.Provider value={{ id, onGetId }}>
      {children}
    </ContextRouterParamProvider.Provider>
  );
}
