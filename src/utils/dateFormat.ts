import { Timestamp } from "firebase/firestore";

export function dateFormat(timestamp: Timestamp) {
  console.log(timestamp);
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = date.toLocaleDateString("pt-BR");
    const hour = date.getHours();

    return `${day} ás ${hour}h`;
  }
}
