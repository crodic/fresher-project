import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "../../Images/kafka.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../Context/createContext";

function Header() {
    const navigate = useNavigate();
    const { logout, user } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Đăng Xuất Thành Công");
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={Avatar}
                        style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "5px",
                            borderRadius: "50%",
                        }}
                    />
                    Crodic
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {((user && user.auth) ||
                        window.location.pathname === "/" ||
                        window.location.pathname === "/manager") && (
                        <>
                            <Nav className="me-auto">
                                <NavLink to={"/"} className="nav-link">
                                    Home
                                </NavLink>
                                <NavLink to={"/manager"} className="nav-link">
                                    Quản Lý Người Dùng
                                </NavLink>
                            </Nav>
                            <Nav>
                                {user && user.auth ? (
                                    <span className="nav-link">
                                        Xin Chào, ${user.email}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <NavDropdown
                                    title="Setting"
                                    id="basic-nav-dropdown"
                                >
                                    {user && user.auth === true ? (
                                        <NavDropdown.Item
                                            href=""
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    ) : (
                                        <NavLink
                                            to="/login"
                                            className="dropdown-item"
                                        >
                                            Login
                                        </NavLink>
                                    )}
                                </NavDropdown>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
