import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
  CircleWavyCheck,
  ClipboardText,
  ClosedCaptioning,
  DesktopTower,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";
import { Loading } from "../components/Loading";
import { ContextRouterParamProvider } from "../contexts/ContextRouterParam";
import Layout from "../layouts/Layout";
import { db } from "../services/firebase";
import { dateFormat } from "../utils/dateFormat";

interface OrderParams {
  id: string;
  created_at: string;
  description: string;
  patrimony: string;
  status: string;
  solution?: string;
  closed_at?: string | undefined;
}

export default function Details() {
  const navigate = useRouter();
  const { id } = useContext(ContextRouterParamProvider);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderParams>({} as OrderParams);
  const [solution, setSolution] = useState("");

  function handleResolveRequest() {
    const ref = doc(db, "orders", id);
    updateDoc(ref, {
      status: "closed",
      closed_at: serverTimestamp(),
      solution,
    });
    navigate.push("/");
  }

  async function handleDeleteRequest(id: string) {
    await deleteDoc(doc(db, "orders", id));
    navigate.push("/home");
  }

  useEffect(() => {
    setLoading(true);
    const ref = doc(db, "orders", id);
    getDoc(ref).then((response) => {
      const id = response.id;
      const {
        description,
        patrimony,
        created_at,
        status,
        solution,
        closed_at,
      } = response.data() as OrderParams;

      setOrder({
        id,
        description,
        patrimony,
        created_at,
        closed_at: dateFormat(closed_at),
        status,
        solution,
      });

      setLoading(false);
    });
  }, [id]);

  return (
    <Layout>
      {order.status === "open" && (
        <Button
          color="bg-red-900"
          title="Excluir Solicitação"
          onClick={() => handleDeleteRequest(order.id)}
        />
      )}
      <div className="bg-gray-700 h-[550px] p-4">
        {loading ? (
          <>
            <div className="flex flex-col gap-4 w-96">
              <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-500">
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-300 h-5 w-5"></div>
                    <div className="flex-1 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-500">
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-300 h-5 w-5"></div>
                    <div className="flex-1 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 w-52 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-500">
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-300 h-5 w-5"></div>
                    <div className="flex-1 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 w-52 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <CardDetails
              title="Equipamento"
              icon={DesktopTower}
              description={order.patrimony}
            />
            <CardDetails
              title="Descrição do problema"
              icon={ClipboardText}
              description={order.description}
              footer="22/07/2022 ás 19h"
            />

            {order.status === "open" ? (
              <CardDetails title="Solução" icon={CircleWavyCheck}>
                <textarea
                  onChange={(e) => setSolution(e.target.value)}
                  value={solution}
                  className="w-full max-h-[200px] bg-gray-500 border border-gray-400 p-4"
                  rows={3}
                />
              </CardDetails>
            ) : (
              <CardDetails
                title="Solução"
                description={order.solution}
                footer={order.closed_at}
                icon={CircleWavyCheck}
              />
            )}
          </>
        )}
      </div>
      {order.status === "open" && (
        <Button title="Enviar Solução" onClick={handleResolveRequest} />
      )}
    </Layout>
  );
}
