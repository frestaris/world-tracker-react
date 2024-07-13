import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteMember = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <DeleteOutlined className="text-danger" /> Delete Member
      </Button>
      <Modal
        title="Delete Member"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Member Name" required>
            <Input placeholder="Enter member name" />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input placeholder="Enter email" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteMember;
