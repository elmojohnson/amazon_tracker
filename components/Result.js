import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Result({ item }) {
  const [star, setStar] = useState(item.saved ? 'star' : 'star_border');
  const [saved, setSaved] = useState(item.saved);
  const { user } = useUser();

  const saveItem = () => {
    setSaved(!saved);
    star === "star" ? setStar("star_border") : setStar("star");
    axios
      .post("/api/items", {
        email: user.email,
        title: item.title,
        img: item.img,
        rrp: item.rrp,
        price: item.price,
        url: item.url,
      })
      .then((res) => {
        res.data.error
          ? toast.error(res.data.msg)
          : toast.success(res.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h5>Item result</h5>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img
                  className="img-fluid p-2"
                  src={item.img}
                  alt={item.title}
                />
              </div>
              <div className={user ? "col-md-6 mt-2" : "col-md-8 mt-2"}>
                <p>{item.title}</p>
                <h5 className="mb-4 fw-bold">
                  {item.price}{" "}
                  <del className="small text-muted fw-light">{item.rrp}</del>
                </h5>

                <button
                  href={item.url}
                  className="btn btn-secondary text-white btn-sm"
                  onClick={() => window.open(item.url)}
                >
                  View on Amazon
                </button>
              </div>
              {user && (
                <div className="col-md-2">
                  <div className="hover">
                    <i
                      className="material-icons text-orange float-end"
                      onMouseEnter={() =>
                        saved ? setStar("star") : setStar("star")
                      }
                      onMouseLeave={() =>
                        saved ? setStar("star") : setStar("star_border")
                      }
                      onClick={saveItem}
                    >
                      {star}
                    </i>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
