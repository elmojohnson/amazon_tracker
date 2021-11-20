export default function Form({ getUrl, loading, error, trackItem }) {
  return (
    <div className="mt-3">
      <h5>Link</h5>
      <div className="input-group">
        {loading ? (
          <input
            disabled
            type="text"
            className="form-control"
          />
        ) : (
          <input
            type="text"
            className="form-control"
            placeholder="Enter Amazon item's link/url"
            onChange={(e) => getUrl(e.target.value)}
          />
        )}
        {loading ? (
          <button className="btn" disabled type="button">
            <span
              className="spinner-border spinner-border-sm text-orange"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        ) : (
          <button
            className="btn bg-orange text-white"
            type="button"
            onClick={trackItem}
          >
            Track
          </button>
        )}
      </div>
      {error && <span className="text-danger">Please enter a link</span>}
      <div className="mb-4" />
    </div>
  );
}
