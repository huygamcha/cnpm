import React, { useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Image,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/loginSlice";
import SearchBox from "./SearchBox";
import MultiLevelDropDown from "./MultiLevelDropDown";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);

  const navigate = useNavigate();

  let cartItems = JSON.parse(localStorage.getItem("cart"));
  console.log("««««« userInfo123 »»»»»", userInfo);
  useEffect(() => {
    //do something else
    cartItems = localStorage.getItem("cart");
  }, [dispatch, cartItems]);

  function logoutHandler() {
    dispatch(logout());
    navigate("/");
    navigate(0);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect sticky="top">
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>Roserade Shop</Navbar.Brand>
        </LinkContainer>
        <MultiLevelDropDown />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <SearchBox />
            <LinkContainer to={"/cart"}>
              <Nav.Link>
                <i class="fa-solid fa-cart-shopping ">
                  <Badge pill>{cartItems?.length}</Badge>
                </i>{" "}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown
                title={
                  <Image
                    src={userInfo.avatar}
                    className="avatar-icon nav-brand"
                    roundedCircle
                  />
                }
                id="username"
              >
                <LinkContainer to={`/profile/${userInfo._id}`}>
                  <NavDropdown.Item>
                    <i class="fa-solid fa-user"></i> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to={"/signup"}>
                  <Nav.Link>
                    <i class="fa-solid fa-user-plus"></i> Sign up
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <i class="fa-solid fa-lock"></i> Login
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title={"Admin"} id="admin">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>
                    <Row>
                      <Col md={1}>
                        <i class="fa-solid fa-chart-simple" />
                      </Col>
                      <Col>Dashboard</Col>
                    </Row>
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />

                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>
                    <Row>
                      <Col md={1}>
                        <i class="fa-solid fa-people-group"></i>
                      </Col>
                      <Col>Users</Col>
                    </Row>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>
                    <Row>
                      <Col md={1}>
                        <i class="fa-solid fa-shirt"></i>
                      </Col>
                      <Col>Products</Col>
                    </Row>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/brands">
                  <NavDropdown.Item>
                    <Row>
                      <Col md={1}>
                        <i class="fa-solid fa-flag"></i>
                      </Col>
                      <Col>Brands</Col>
                    </Row>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/categories">
                  <NavDropdown.Item>
                    <Row>
                      <Col md={1}>
                        <i class="fa-solid fa-bag-shopping"></i>
                      </Col>
                      <Col>Categories</Col>
                    </Row>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>
                    <Row>
                      <Col md={1}>
                        <i class="fa-solid fa-file-invoice-dollar"></i>
                      </Col>
                      <Col>Orders</Col>
                    </Row>
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
