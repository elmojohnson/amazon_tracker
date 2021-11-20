import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function prices() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState({
    title: "",
    price: "",
    rrp: "",
    img: "",
    url: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getItem();
  }, [id]);

  const getItem = async () => {
    const data = await axios.get(`./api/view_item?id=${id}`);
    setItem({
      title: data.data.title,
      price: data.data.price,
      rrp: data.data.rrp,
      img: data.data.img,
      url: data.data.url,
      date: data.data.date,
    });
    setLoading(false);
  };

  const deleteItem = async () => {
    const res = await axios.get(`./api/delete?id=${id}`);
    if (res.data.delete) {
      router.push("/saved");
    }
  };

  return (
    <div className="mt-3">
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img src={item.img} className="img-fluid mb-3" />
            <p>{item.title}</p>
            <h5 className="fw-bold">
              {item.price} <del className="fw-light text-muted">{item.rrp}</del>
            </h5>
            <small className="text-muted">
              Saved:{" "}
              {new Date(item.date.seconds * 1000).toLocaleDateString("en-US")}
            </small>
            <div className="mb-2" />
            <div className="vstack gap-2">
              <a
                onClick={() => window.open(item.url)}
                className="btn bg-orange text-white w-100"
              >
                Amazon
              </a>
              <button
                onClick={deleteItem}
                className="btn btn-outline-dark btn-sm w-100"
              >
                Remove item
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h5>Price Changes</h5>
            <div className="card">
              <div className="card-body text-muted">
                <i>Feature coming soon...</i>
                <ul>
                  <li>Track price changes</li>
                  <li>Notification via SMS or E-mail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="row mt-3">
      <div className="col-md-6">
        <Skeleton height={300} className="mb-2" />
        <Skeleton height={20} className="mb-2" />
        <Skeleton height={30} width={100} className="mb-2" />
      </div>
      <div className="col-md-6">
        <Skeleton height={30} width={100} />
        <Skeleton height={100} count={5} />
      </div>
    </div>
  );
};
