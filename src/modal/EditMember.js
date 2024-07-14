import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

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

const EditMember = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    setSelectedUserIndex(null); // Reset selected user index
    setName(""); // Reset name
    setColor(""); // Reset color
  };

  useEffect(() => {
    if (selectedUserIndex !== null) {
      const user = users[selectedUserIndex];
      if (user) {
        setName(user.name);
        setColor(user.color);
      }
    }
  }, [selectedUserIndex, users]);

  const showModal = () => {
    setIsModalVisible(true);
    loadUsers();
    const user = users[selectedUserIndex];
    if (user) {
      setName(user.name);
      setColor(user.color);
    }
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
      updatedUsers[selectedUserIndex] = { name, color };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      message.success("Member updated successfully.");
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
              value={"Select a member..."}
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
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default EditMember;
