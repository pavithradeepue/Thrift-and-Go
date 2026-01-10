import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchDresses() {
  const q = query(
    collection(db, "dresses"),
    where("isAvailable", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
