import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Select, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const DeleteMember = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };
  const showModal = () => {
    setIsModalVisible(true);
    loadUsers();
  };

  const handleOk = () => {
    deleteUser();
    setIsModalVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteUser = () => {
    if (selectedUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers.splice(selectedUserIndex, 1);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setSelectedUserIndex(null);
      message.success("Member deleted successfully.");
    }
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
          <Button key="submit" type="primary" danger onClick={handleOk}>
            Delete
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item>
            <Select
              placeholder="Select a member..."
              value={selectedUserIndex}
              onChange={(value) => setSelectedUserIndex(value)}
            >
              {users.map((user, index) => (
                <Option key={index} value={index}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteMember;
