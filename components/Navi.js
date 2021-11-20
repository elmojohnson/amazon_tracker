import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useEffect } from "react";

export default function Navi() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="./amazon.png" width="30" className="me-2" />
            Price Tracker
          </a>
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
              <a className="nav-link" href="/">
                Home
              </a>
              {user && (
                <a className="nav-link" href="/saved">
                  Saved
                </a>
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
                      <a className="dropdown-item" href="/account">
                        Account
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/api/auth/logout"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              {!user && (
                <a className="nav-link" href="/api/auth/login">
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
