import React from "react";
import { Link } from "react-router-dom";
import "../../style/NotFound.css";

const notFound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound-title">Oops! Page Not Found</h1>

      <Link to="/" className="NotFound-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default notFound;
