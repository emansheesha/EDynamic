import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { deleteTableData } from "../../api/apis";

const Delete = ({ contact }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    deleteTableData(contact.id);
    setOpen(false);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
    {/* delete  contact */}
      <Tooltip title="Delete User">
        <DeleteFilled
          onClick={(e) => {
            showModal();
          }}
          style={{ fontSize: "16px", margin: "auto 10px", cursor: "pointer" }}
        />
      </Tooltip>

      <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>{`Are You Sure To Delete ${contact.first_name} contact`}</p>
      </Modal>
    </>
  );
};
export default Delete;
