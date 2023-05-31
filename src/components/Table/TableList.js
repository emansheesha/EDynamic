import { Table, Space, Select } from "antd";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Delete from "./Delete";
import Create from "./Create";
import Edit from "./Edit";
import { CheckAccessToken, CheckRefreshToken, SearchTableData } from "../../api/apis";
const tHData = ["first_name", "last_name", "email"];
const TextEllipsis = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const TableList = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchSelect, setSearchSelect] = useState(tHData[0]);
  // handle Search Change function
  const handleSearchChange = (value) => {
    setSearchSelect(value);
  };
  // set table with data
  useEffect(() => {
    setTableData(data);
    // console.log(data);
  }, [data]);
  // set search value
  useEffect(() => {
    setSearchValue(searchValue);
  }, [searchValue]);
  // when user submit the form of search, search in table by the api to get the result
  const submitForm = async (e) => {
    // prevent refresh
    e.preventDefault();
   
    const searchRes = await SearchTableData(searchValue, searchSelect);
    setTableData(searchRes);
  };
  // columns of the table
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      editable: true,
      mobile: false,
      type: "string",
      render: (text, record) => {
        return <TextEllipsis>{text}</TextEllipsis>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      editable: true,
      mobile: false,
      type: "string",
      render: (text, record) => {
        return <TextEllipsis>{text}</TextEllipsis>;
      },
    },
    {
      title: "Email",

      dataIndex: "email",
      editable: true,
      key: "email",
      mobile: false,
      type: "string",
      render: (text, record) => {
        return <TextEllipsis>{text}</TextEllipsis>;
      },
    },
    {
      title: "Action",
      width: "100px",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Edit
            style={{ fontSize: "16px", cursor: "pointer" }}
            contact={record}
          />
          <Delete
            style={{ fontSize: "16px", cursor: "pointer" }}
            contact={record}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* form to submit the value of search input and select the column to send the values to api */}
      <form onSubmit={submitForm}  style={{
            backgroundColor: "transparent",
            borderRadius: "0.5rem",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            maxWidth:"300px",

          }} className="ms-auto me-2">
        {/* select to know which column will be filtered */}
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mx-auto"
        />
        <Select
          defaultValue={searchSelect}
          style={{
            width: 260,
            display: "inline",
          }}
          onChange={handleSearchChange}
          options={tHData?.map((item) => ({
            label: item,
            value: item,
          }))}
          className="mx-auto"
        />{" "}
        <button
          type="submit"
          className="mx-auto my-1 pt-0"
          style={{
            width: "260px",
            height:"40px",
            backgroundColor:"#0d6efd",
            borderRadius:"0.5rem"
          }}
        >
          Search
        </button>
      </form>
      {/* data of table */}
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        title={() => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h6 style={{ marginTop: "5px" }}>Contacts</h6>
            <Create />
          </div>
        )}
        className="m-2"
        scroll={{ x: 1000, y: 400 }}
      />
    </>
  );
};
export default TableList;
