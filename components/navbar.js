import React from "react";
import Link from "next/link";
import Image from "next/image";
import ss from "../public/ss.png";
const MainNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-gray">
      <div className="container w-100 pe-2">
        <Link className="navbar-brand" href="/#">
          <Image src={ss} alt="" width={50} height={40} />
          Shopper Stop
        </Link>

        <div className="collapse navbar-collapse" id="navbarLinks">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link className="nav-link" id="cart" href="/user/accessCart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="nav-link" id="signout" href="/api/auth/signout">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
