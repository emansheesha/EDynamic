import React, { useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useState } from "react";
import { createTableData } from "../../api/apis";
function Create() {
  const [open, setOpen] = useState(false);
  const Submit_ref = useRef();
  useEffect(() => {}, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleOnFinish = (values) => {
    // console.log("values of form", values);
    let response = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
    };

    createTableData(response);
  };

  return (
    <>
      {/* create new contact */}
      <div className="d-flex flex-row justify-content-end m-2">
        <Button onClick={showDrawer} className="ml-2">
          <PlusOutlined /> Add New
        </Button>
      </div>
      <Drawer
        title="Add Contact"
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
        <Form layout="vertical" onFinish={handleOnFinish}>
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
                required: false,
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
}

export default Create;
