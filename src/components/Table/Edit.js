import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space, Tooltip } from "antd";
import { useState, useRef } from "react";
import { EditTableData } from "../../api/apis";
const Edit = ({ contact }) => {
  const [initialContactValues, setInitialContactValues] = useState({});
  const [open, setOpen] = useState(false);
  const Submit_ref = useRef();

  const handleEditClick = (e) => {
    setInitialContactValues(contact);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleOnFinish = (values) => {
    let response = {
      id: initialContactValues?.id,
      data: {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
      },
    };
    EditTableData(response.data, response.id);
  };

  return (
    <>
    {/* edit contact */}
      <Tooltip title="Edit Contact">
        <EditOutlined onClick={(e) => handleEditClick()} />
      </Tooltip>
      <Drawer
        title={`Update ${contact?.first_name} contact`}
        width={600}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
          background: "#e7e7e7",
          height: "100%",
          maxHeight: "100%",
        }}
        footer={
          <div>
            {" "}
            <Form.Item>
              <Space>
                <Button
                  onClick={(e) => {
                    Submit_ref.current?.click();
                  }}
                  type="primary"
                >
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Space>
            </Form.Item>
          </div>
        }
      >
        <Form
          layout="vertical"
          onFinish={handleOnFinish}
          initialValues={{
            ["first_name"]: initialContactValues.first_name,
            ["last_name"]: initialContactValues.last_name,
            ["email"]: initialContactValues.email,
          }}
        >
          <Row gutter={16}>
            <Col span={24}></Col>
            <Col span={24}></Col>
          </Row>

          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please enter contact first name",
              },
            ]}
          >
            <Input placeholder="Please enter contact first name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please enter last_name",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
              placeholder="Please enter last name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter valid email",
              },
            ]}
          >
            <Input placeholder="Please enter contact email" />
          </Form.Item>

          <Row gutter={16} style={{ display: "flex", justifyContent: "end" }}>
            <Col span={24} style={{ textAlign: "right", display: "none" }}>
              <Form.Item style={{ textAlign: "right" }}>
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    ref={Submit_ref}
                    htmlType="submit"
                    onClick={onClose}
                    type="primary"
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default Edit;
