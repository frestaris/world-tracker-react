import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

const AddMember = ({ onSelectUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    saveUser();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveUser = () => {
    const user = { name, color, countries };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    // Optionally, you can reset the form fields here
    setName("");
    setColor("");
    setCountries([]);
    message.success("Member added successfully.");
    if (onSelectUser) {
      onSelectUser(user.name, color);
    }
    navigate(`/${user.name}`);
    console.log(user);
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <PlusOutlined className="text-success" /> Add Member
      </Button>

      <Modal
        title="Add Member"
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
            style={{ backgroundColor: "#51a47e", borderColor: "#52c41a" }}
          >
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Member Name" required>
            <Input
              placeholder="Enter member name..."
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
        </Form>
      </Modal>
    </>
  );
};

export default AddMember;
