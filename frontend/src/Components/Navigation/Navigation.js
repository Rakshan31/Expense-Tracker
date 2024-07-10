import React, { useState } from "react";
import avatar from "../../images/avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useGlobalContext } from "../../Context/GlobalContext";

function Navigation() {
  const { totalBalance } = useGlobalContext();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const name = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
    {name ? (<>
      <nav className="nav-styled">
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div>
          <p style={{ fontWeight: "700", color: "white" }}>
            {name ? name : "Guest"}
          </p>
          <p>{name ? `Total Balance : ₹ ${totalBalance()}` : ""}</p>
        </div>
      </div>
      <ul className="menu-items">
            <li>
              <Link
                to="/"
                className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                onClick={() => setActiveLink("/")}
              >
                DashBoard
              </Link>
            </li>
            <li>
              <Link
                to="/transaction"
                className={`nav-link ${
                  activeLink === "/transaction" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/transaction")}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                className={`nav-link ${
                  activeLink === "/income" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/income")}
              >
                Income
              </Link>
            </li>
            <li>
              <Link
                to="/expense"
                className={`nav-link ${
                  activeLink === "/expense" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/expense")}
              >
                Expense
              </Link>
            </li>
          </ul>
          <div className="bottom-nav">
            <li>
              <span onClick={handleLogout}>Sign Out</span>
            </li>
          </div>
    </nav>
    </>):""}
    </>
  );
}

export default Navigation;
