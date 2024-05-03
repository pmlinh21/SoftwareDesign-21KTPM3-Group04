import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Response from '../response/Response';
import './ResponsePagination.css'
const ITEMS_PER_PAGE = 3;

const ResponsePagination = ({responses, author, deleteResponse, setReportContent}) => {
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
        <div className="px-0 col-12">
            <ul className="ps-0 row col-12">
                {currentItems?.map(item => (
                    <Response key={item.id_response} response={item} author={author} 
                    deleteResponse={deleteResponse}
                    setReportContent={setReportContent}></Response>
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
