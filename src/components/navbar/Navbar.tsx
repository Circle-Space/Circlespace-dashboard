import { Nav, Navbar } from "react-bootstrap";
import useLayout from "../../hooks/useLayout";
import useSidebar from "../../hooks/useSidebar";
import NavbarUser from "./NavbarUser";


const NavbarComponent = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const { navbarTitle } = useLayout();

  //#f4f7f9
  return (
    <Navbar
      variant="light"
      expand
      className="navbar-bg d-flex justify-content-between"
    >
      <span
        className="sidebar-toggle d-flex"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <h3 className="navbar-title">{navbarTitle}</h3>

      <Navbar.Collapse className="flex-grow-0">
        <Nav className="navbar-align">
          <NavbarUser />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
