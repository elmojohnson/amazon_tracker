const cheerio = require("cheerio");
const request = require("request");
import { app } from "../../firebase/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function handler(req, res) {
  const db = getFirestore(app);
  if (req.method === "POST") {
    const { url, email } = req.body;
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const img = $("#landingImage").attr("data-old-hires");
        const title = $("#productTitle").text().trim();
        const rrp = $("#corePrice_desktop")
          .find(".a-size-base")
          .find(".a-offscreen")
          .html();
        const price = $("#corePrice_desktop")
          .find(".apexPriceToPay")
          .find(".a-offscreen")
          .text();

        if (email) {
          checkItem(res, db, title, img, rrp, price, url, email);
        } else {
          res.status(200).json({
            title: title,
            img: img,
            rrp: rrp,
            price: price,
            url: url,
            saved: false,
          });
        }
      }
    });
  }
}

const checkItem = async (res, db, title, img, rrp, price, url, email) => {
  const ref = collection(db, "items");
  const q = query(
    ref,
    where("title", "==", title),
    where("email", "==", email)
  );
  const snap = await getDocs(q);
  let count = 0;
  let id = "";

  snap.forEach((doc) => {
    count++;
    id = doc.id;
  });

  res.status(200).json({
    title: title,
    img: img,
    rrp: rrp,
    price: price,
    url: url,
    saved: count === 0 ? false : true,
  });
};
