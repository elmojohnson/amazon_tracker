export default function Item({ item }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img className="img-fluid p-2" src={item.img} alt={item.title} />
          </div>
          <div className="col-md-8 mt-2">
            <p>{item.title}</p>
            <h5 className="mb-4 fw-bold">
              {item.price}{" "}
              <del className="small text-muted fw-light">{item.rrp}</del>
            </h5>
            <a
              href={`/prices?id=${item.id}`}
              className="btn btn-secondary text-white btn-sm"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
