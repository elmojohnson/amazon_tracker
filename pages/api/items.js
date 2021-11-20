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
  orderBy,
} from "firebase/firestore";

export default async function handler(req, res) {
  const db = getFirestore(app);
  if (req.method === "POST") {
    const { email, title, img, rrp, price, url } = req.body;
    // check if item exist
    const ref = collection(db, "items");
    const q = query(ref, where("title", "==", title), where("email", "==", email), orderBy("date"));
    const snap = await getDocs(q);
    let count = 0;
    let id = "";

    snap.forEach((doc) => {
      count++;
      id = doc.id;
    });

    count === 0
      ? saveItem(db, res, email, title, img, rrp, price, url)
      : deleteItem(db, res, id);
  }
}

const saveItem = async (db, res, email, title, img, rrp, price, url) => {
  try {
    const docRef = await addDoc(collection(db, "items"), {
      email: email,
      title: title,
      img: img,
      rrp: rrp,
      price: price,
      url: url,
      date: new Date(),
      saved: true
    });
    res.status(200).json({
      msg: "Item saved",
      alert: "success",
      error: false,
    });
  } catch (e) {
    res.status(200).json({
      msg: e,
      alert: "danger",
      error: true,
    });
  }
};

const deleteItem = async (db, res, id) => {
  await deleteDoc(doc(db, "items", id))
    .then((result) => {
      res.status(200).json({
        msg: "Item removed",
        alert: "warning",
        error: false,
      });
    })
    .catch((error) => {
      res.status(200).json({
        msg: error,
        alert: "danger",
        error: true,
      });
    });
};
