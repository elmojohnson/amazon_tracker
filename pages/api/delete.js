import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase/firebase";

export default async function handler(req, res) {
  const db = getFirestore(app);
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const del = await deleteDoc(doc(db, "items", id));
      res.status(200).json({
        result: "Deleted",
        delete: true,
      });
    } else {
      res.status(200).json({
        result: "Failed to delete",
        delete: false,
      });
    }
  }
}
