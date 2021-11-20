import { useUser } from "@auth0/nextjs-auth0";

export default function account() {
  const { user, isLoading } = useUser();

  return (
    <div className="mt-3">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="align-self-center text-center">
          <img
            src={user.picture}
            className="img-fluid rounded-circle"
            alt={user.name}
          />
          <p className="lh-1 mt-4 fs-3">{user.name}</p>
          <p>{user.email}</p>
          <a href="/api/auth/login" className="btn btn-sm btn-outline-dark w-25">Logout</a>
        </div>
      )}
    </div>
  );
}
