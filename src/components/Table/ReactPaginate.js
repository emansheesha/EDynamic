import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getTableData } from "../../api/apis";
import TableList from "./TableList";
const Pagination = () => {
  // handle pagination
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(1);

  useEffect(() => {
    const getComments = async () => {
      let limit = 10;
      const data = await getTableData(pageCount);

      const total = data?.count;
      setpageCount(Math.ceil(total / limit));
      // setpageCount(data?.count);
      // console.log(data, pageCount);
      setItems(data?.results);
      return data;
    };

    getComments();
  }, []);
  const handlePageClick = async (data) => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    const newData = await getTableData(currentPage);
    setItems(newData?.results);
  };
  return (
    <div>
      <TableList data={items} />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
