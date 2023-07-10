import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './pagination.scss'

function Pagination({ setDisplayUsers, usersStored, total, pageNumber, pageSize }: any) {
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const pageCount = Math.ceil(total / itemsPerPage);

    useEffect(() => {
        setDisplayUsers(usersStored);
    }, [itemsPerPage, usersStored]);

    const handleSelectChange = (e: any) => {
        setItemsPerPage(e.target.value);
        pageSize(e.target.value);
        setDisplayUsers(usersStored)
    };

    return (
        <div className="pagination-wrapper">
            <div>
                {" "}
                Showing{" "}
                <select name="select" id="select" onChange={handleSelectChange}>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>{" "}
                out of {total}
            </div>
            {pageCount > 1 && (

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={(selected) => pageNumber(selected.selected + 1)}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    className="pagination"
                    activeClassName="active-page"
                    renderOnZeroPageCount={() => null}
                />
            )}
        </div>
    );
}

export default Pagination;