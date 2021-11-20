import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../components/Item";
import ItemsLoader from "../components/ItemsLoader";

export default function saved() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const user = await axios.get("./api/auth/me");
    const itemData = await axios.get(
      `http://localhost:3000/api/saved?email=${user.data.email}`
    );
    setItems(itemData.data);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Saved Items</title>
      </Head>
      <div className="mt-3">
        <h3>Saved Items</h3>
        {loading ? (
          <ItemsLoader />
        ) : (
          <div>
            {items.map((item, i) => {
              return <Item key={i} item={item} />;
            })}
            <p className="mb-4 text-center text-muted">{items.length >= 1 ? items.length + " items" : items.length + " item"}</p>
          </div>
        )}
      </div>
    </>
  );
}
