import './pagination.css';

const Pagination = ({ page, handlePreviousPage, handleNextPage, total }) => {
  return (
    <div className="pages">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className="paginationBtn"
      >
        Previous
      </button>
      <button className="paginationBtn" onClick={handleNextPage} disabled={page >= total}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
