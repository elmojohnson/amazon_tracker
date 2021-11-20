import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../../firebase/firebase";

export default function handler(req, res) {
  if (req.method === "GET") {
    getItems(req, res);
  }
}

const getItems = async (req, res) => {
  const email = req.query.email
  const db = getFirestore(app);
  const q = query(collection(db, "items"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(data);
};
