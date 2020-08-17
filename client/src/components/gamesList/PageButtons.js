import React from "react";
import PropTypes from "prop-types";
import "../../style/PageButtons.css";

const PageButtons = (props) => {
  const { page, totalPages, handlePageButtonClick } = props;

  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        onClick={() => handlePageButtonClick("prev")}
        disabled={page <= 1}
      >
        &larr;
      </button>
      <span className="Pagination-info">
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>
      <button
        className="Pagination-button"
        onClick={handlePageButtonClick.bind(this, "next")}
        disabled={page >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

PageButtons.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageButtonClick: PropTypes.func.isRequired,
};

export default PageButtons;
