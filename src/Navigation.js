import React from "react";
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

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand>World Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Search />
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <>
                  <SettingOutlined /> Hi {"Current User"}
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <AddMember />
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <EditMember />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                style={{ backgroundColor: "transparent", color: "#000" }}
              >
                <DeleteMember />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
