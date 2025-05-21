import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { PieChart, Settings, User } from "react-feather";
import useAuth from "../../hooks/useAuth";
import Avatar from "react-avatar";
const NavbarUser = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate();
  const fullName = user ? `${user.FirstName} ${user.LastName}` : ''
  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <Avatar className='me-1' name={fullName} size="30" round />

          <span className="text-dark">{fullName}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/profile")}>
          <User size={18} className="align-middle me-2" />
          Profile
        </Dropdown.Item>
        {/* <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item> */}
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
