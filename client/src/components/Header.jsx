import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { clearOrder } from "../slices/orderSlice";
import { updateProduct } from "../slices/productSlice";
import logo from "../assets/b.png";

const Header = () => {

  

  const location = useLocation();
  const [searchItem, setSearchItem] = useState("");

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const {data : products, isLoading, error} = useGetProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // without unwrap the logoutApiCall returns redux action object, with it, it returns promise-like object
      dispatch(logout());
      dispatch(clearOrder());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    if (location.pathname === '/' && Array.isArray(products) && products.length > 0){
    const value = e.target.value;
    setSearchItem(value);
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
    dispatch(updateProduct(filteredProducts));
    }
  }

  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        className="fixed-top header shadow-sm"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center justify-content-center">
              <img
                src={logo}
                alt="Logo"
                style={{
                  maxHeight: 50,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              ></img>
              <h2 style={{ marginTop: 6, marginLeft: 10 }}>BCS</h2>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Form className="d-flex">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                  style={{
                    minWidth: '250px',
                    width: '300px'
                  }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    size="sm"
                    aria-label="Search"
                    value={searchItem}
                    onChange={handleSearch}
                    disabled={location.pathname !== '/'}
                  />
                </InputGroup>
              </Form>
              <LinkContainer to="/">
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart{" "}
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ margingLeft: "5px" }}>
                      {cartItems.reduce((acc, cur) => {
                        return acc + cur.qty;
                      }, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
