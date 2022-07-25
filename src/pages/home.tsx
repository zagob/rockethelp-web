import Link from "next/link";
import { ChatTeardrop, ChatTeardropText } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CardRequest } from "../components/CardRequest";
import { Filter } from "../components/Filter";
import { Header } from "../components/Header";
import { Requests } from "../components/Requests";

import {
  onSnapshot,
  collection,
  where,
  doc,
  query,
  serverTimestamp,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { dateFormat } from "../utils/dateFormat";
import { useRouter } from "next/router";
import { ContextRouterParamProvider } from "../contexts/ContextRouterParam";
import { Loading } from "../components/Loading";

interface ordersParams {
  id: string;
  patrimony: string;
  description: string;
  status: "open" | "closed";
  created_at: string | undefined;
}

export default function Home() {
  const { onGetId } = useContext(ContextRouterParamProvider);
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<ordersParams[]>([]);

  function handleNavigateDetails(id: string) {
    onGetId(id);
    route.push("/Details");
  }

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "orders"),
      where("status", "==", statusSelected)
    );
    const subscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const { patrimony, status, created_at, description } = doc.data();

        return {
          id: doc.id,
          patrimony,
          status,
          created_at: dateFormat(created_at),
          description,
        };
      });

      setOrders(data);
      setLoading(false);
    });

    return subscribe;
  }, [statusSelected]);

  return (
    <div className="bg-gray-700 h-[600px]">
      <Header />
      <div className="p-4 h-[calc(100%-55px)]">
        <Requests quantity={orders.length} />
        <div className="flex gap-4">
          <Filter
            typeStatus="open"
            title="Em andamento"
            isActive={statusSelected === "open"}
            onClick={() => setStatusSelected("open")}
          />
          <Filter
            typeStatus="closed"
            title="Finalizados"
            isActive={statusSelected === "closed"}
            onClick={() => setStatusSelected("closed")}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loading />
          </div>
        ) : (
          <>
            <div>
              {orders.length === 0 ? (
                <div className="flex items-center flex-col text-gray-400 mt-6">
                  <ChatTeardropText className="" size={100} />
                  <span className="text-gray-300 text-lg">
                    Você ainda não tem {<br />} chamados{" "}
                    {statusSelected === "open" ? "abertos" : "finalizados"}
                  </span>
                </div>
              ) : (
                <div className=" max-h-[400px] overflow-auto">
                  {orders.map((order) => (
                    <CardRequest
                      key={order.id}
                      status={order.status}
                      title={order.patrimony}
                      date={order.created_at}
                      onClick={() => handleNavigateDetails(order.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Link href="/Register">
        <a>
          <Button title="Nova solicitação" />
        </a>
      </Link>
    </div>
  );
}
