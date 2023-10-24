import React, { useContext } from "react";
import { AllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

function PageBtnContainer() {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const {
    data: { numOfPages, currentPage },
  } = useContext(AllJobsContext);

  //creating an array for page number
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  //function for changing page
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <section className="h-24 mt-8 flex items-center justify-end flex-wrap gap-4">
      <button
        className="bg-gray-100 text-primary rounded w-24 h-10 capitalize flex items-center justify-center gap-2 cursor-pointer hover:bg-violet-300"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className=" flex bg-gray-100 rounded">
        {pages?.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={` border-transparent w-12 h-10 font-semibold text-lg  rounded cursor-pointer  ${
                currentPage === pageNumber
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-violet-300 bg-transparent"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="bg-gray-100 text-primary rounded w-24 h-10 capitalize flex items-center justify-center gap-2 cursor-pointer hover:bg-violet-300"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </section>
  );
}

export default PageBtnContainer;
