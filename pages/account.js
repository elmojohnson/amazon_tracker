import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Account() {
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
          <Link href="/api/auth/login">
            <a className="btn btn-sm btn-outline-dark w-25">Logout</a>
          </Link>
        </div>
      )}
    </div>
  );
}
