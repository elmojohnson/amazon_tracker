import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";

export default function Navi() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <img src="./amazon.png" width="30" className="me-2" />
              Price Tracker
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
              {user && (
                <Link href="/saved">
                  <a className="nav-link">Saved</a>
                </Link>
              )}
              {user && (
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user ? user.name : "Account"}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li>
                      <Link href="/account">
                        <a className="dropdown-item">Account</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/api/auth/logout">
                        <a className="dropdown-item">Logout</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {!user && (
                <Link href="/api/auth/login">
                  <a className="nav-link">Login</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
