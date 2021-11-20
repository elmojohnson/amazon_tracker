import { app } from "../../firebase/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default async function handler(req, res) {
  const db = getFirestore(app);
  if (req.method === "GET") {
    const { url, email } = req.query;

    // check if item exist
    const ref = collection(db, "items");
    const q = query(ref, where("url", "==", url), where("email", "==", email));
    const snap = await getDocs(q);
    let count = 0;
    let id = "";

    snap.forEach((doc) => {
      count++;
      id = doc.id;
    });

    doc === 0
      ? res.status(200).json({ saved: false })
      : res.status(200).json({ saved: true });
  }
}
