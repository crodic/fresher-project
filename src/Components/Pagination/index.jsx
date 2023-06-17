import ReactPaginate from "react-paginate";

function Paginate({ totalPage, pageChange }) {
    const handlePageClick = (event) => {
        pageChange(event.selected + 1);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="< previous"
            pageLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName={"pagination"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            renderOnZeroPageCount={null}
            activeClassName={"active"}
        />
    );
}

export default Paginate;
