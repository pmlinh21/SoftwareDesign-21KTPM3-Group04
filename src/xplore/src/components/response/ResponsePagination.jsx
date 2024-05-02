import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Response from '../response/Response';

const ITEMS_PER_PAGE = 3;

const ResponsePagination = ({responses, author}) => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setPageCount(Math.ceil(responses?.length / ITEMS_PER_PAGE));
    }, [responses]);

    const handlePageClick = (event) => {
        const newPage = event.selected;
        setCurrentPage(newPage);
    };

    // Calculate the displayed items
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = responses?.slice(offset, offset + ITEMS_PER_PAGE);

    return (
        <div className="d-flex align-items-center flex-column">
            <ul>
                {currentItems?.map(item => (
                    <Response key={item.id_response} response={item} author={author}></Response>
                ))}
            </ul>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default ResponsePagination;
