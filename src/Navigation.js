import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { SettingOutlined } from "@ant-design/icons";
import Search from "./Search";
import AddMember from "./modal/AddMember";
import EditMember from "./modal/EditMember";
import DeleteMember from "./modal/DeleteMember";
import SwitchMember from "./modal/SwitchMember";
import User from "./modal/User";

const Navigation = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserColor, setSelectedUserColor] = useState("");
  const [updateKey, setUpdateKey] = useState(0);

  const handleSelectUser = (user, color) => {
    setSelectedUser(user);
    setSelectedUserColor(color);
  };

  const handleUpdateUser = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="/">World Tracker</Navbar.Brand>
        <User
          selectedUser={selectedUser}
          color={selectedUserColor}
          onUpdateUser={updateKey}
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Search />
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <>
                  <SettingOutlined /> Dashboard{" "}
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <AddMember onSelectUser={handleSelectUser} />
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <EditMember
                  onSelectUser={handleSelectUser}
                  onUpdateUser={handleUpdateUser}
                />{" "}
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <SwitchMember onSelectUser={handleSelectUser} />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <DeleteMember onSelectUser={handleSelectUser} />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
