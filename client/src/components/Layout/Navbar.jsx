import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="Nav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#page-top">
            iPoem-NRG Lenau
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/#header">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/generate">
                  Generate Poem
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
