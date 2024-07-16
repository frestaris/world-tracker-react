import React, { useState } from "react";
import { Modal, Button, Form, Select, message } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const SwitchMember = ({ onSelectUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };

  const showModal = () => {
    setIsModalVisible(true);
    loadUsers();
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (value) => {
    setSelectedUser(value);
    setIsModalVisible(false);
    if (value !== null && users[value]) {
      const userName = users[value].name;
      const userColor = users[value].color;
      const userCountries = users[value].countries;

      navigate(`/${userName}`);
      message.success("Member switched.");
      onSelectUser(userName, userColor, userCountries);
      console.log(userName, userColor, userCountries);
    }
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <UserSwitchOutlined className="text-primary" /> Switch Member
      </Button>
      <Modal
        title="Switch Member"
        open={isModalVisible}
        onOk={() => handleOk(selectedUser)}
        onCancel={handleCancel}
        footer={null}
      >
        <Form.Item label="Select Member">
          <Select
            placeholder="Switch member..."
            value={selectedUser}
            onChange={handleOk}
          >
            {users.map((user, index) => (
              <Option key={index} value={index}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default SwitchMember;
