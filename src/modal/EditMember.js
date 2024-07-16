import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { countriesData } from "../data";

const { Option } = Select;

const colorOptions = [
  { value: "Red", color: "#db2828" },
  { value: "Orange", color: "#f2711c" },
  { value: "Yellow", color: "#fbbd08" },
  { value: "Olive", color: "#b5cc18" },
  { value: "Green", color: "#21ba45" },
  { value: "Teal", color: "#00b5ad" },
  { value: "Blue", color: "#2185d0" },
  { value: "Violet", color: "#6435c9" },
  { value: "Purple", color: "#a333c8" },
  { value: "Pink", color: "#e03997" },
];

const EditMember = ({ onSelectUser, onUpdateUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    setSelectedUserIndex(null); // Reset selected user index
    setName(""); // Reset name
    setColor(""); // Reset color
    setCountries([]); // Reset countries
  };

  useEffect(() => {
    if (selectedUserIndex !== null) {
      const user = users[selectedUserIndex];
      if (user) {
        setName(user.name);
        setColor(user.color);
        setCountries(user.countries || []);
      }
    }
  }, [selectedUserIndex, users]);

  const showModal = () => {
    setIsModalVisible(true);
    loadUsers();
  };

  const handleOk = () => {
    updateUser();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateUser = () => {
    if (selectedUserIndex !== null) {
      const updatedUsers = [...users];
      const updatedUser = { name, color, countries };
      updatedUsers[selectedUserIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      message.success("Member updated successfully.");
      if (onSelectUser) {
        onSelectUser(updatedUser.name, color);
      }
      if (onUpdateUser) {
        onUpdateUser();
      }
      navigate(`/${updatedUser.name}`);
    }
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <EditOutlined className="text-warning" /> Edit Member
      </Button>
      <Modal
        title="Edit Member"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
          >
            Edit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item required>
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
          {selectedUserIndex !== null && (
            <>
              <Form.Item label="Member Name" required>
                <Input
                  placeholder="Enter member name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Color" required>
                <Select
                  value={color}
                  style={{ width: 120 }}
                  onChange={(value) => setColor(value)}
                >
                  {colorOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: option.color,
                            marginRight: "8px",
                          }}
                        />
                        {option.value}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Countries" required>
                <Select
                  mode="multiple"
                  placeholder="Select countries..."
                  value={countries}
                  onChange={(value) => setCountries(value)}
                >
                  {countriesData.map((country) => (
                    <Option key={country.title} value={country.title}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            backgroundColor: "#ccc",
                          }}
                        />
                        {country.title}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default EditMember;
