const Pagination = ({ page, handlePreviousPage, handleNextPage, total }) => {
  return (
    <div className="pages">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className="btn"
      >
        Previous
      </button>
      <button className="btn" onClick={handleNextPage} disabled={page >= total}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
