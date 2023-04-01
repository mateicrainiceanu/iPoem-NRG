import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section id="header">
    <header className="main">
      <div
        className="
          container
          px-4 px-lg-5
          d-flex
          h-100
          align-items-center
          justify-content-center
        "
      >
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h1 className="mx-auto my-0 text-uppercase">iPoem</h1>
            <h3 className="text-white-50 mx-auto mt-2 mb-5">
              With the click of a button, users can input a few keywords or
              phrases to guide the app's creative process, and within moments,
              the app generates a poem that captures the essence of their input.
            </h3>
            <Link className="btn btn-dark" to="/generate">
              Genarate
            </Link>
          </div>
        </div>
      </div>
    </header>
    </section>
  );
};

export default Header;
