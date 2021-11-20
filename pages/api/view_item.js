import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase/firebase";


export default async function handler(req, res) {
    const db = getFirestore(app)
    if(req.method === 'GET') {
        const {id} = req.query
        const docRef = doc(db, "items", id)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            res.status(200).json(docSnap.data())
        } else {
            res.status(500).json({msg: "No data"})
        }
    }
  }
  