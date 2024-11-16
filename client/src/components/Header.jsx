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
import { useGetPaginatedProductsQuery } from "../slices/productsApiSlice";
import { clearOrder } from "../slices/orderSlice";
import { updateProduct, clearProduct } from "../slices/productSlice";
import logo from "../assets/b.png";
import { clearCartItems, clearShippingAddress } from "../slices/cartSlice";

const Header = () => {
  const location = useLocation();
  const [searchItem, setSearchItem] = useState("");

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useGetPaginatedProductsQuery({
    page: 1,
    limit: 6,
  });

  const electronics = data?.electronics;
  const casual = data?.casual;
  const products = electronics && casual ? electronics.concat(casual) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // without unwrap the logoutApiCall returns redux action object, with it, it returns promise-like object
      dispatch(logout());
      dispatch(clearOrder());
      dispatch(clearCartItems());
      dispatch(clearShippingAddress());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    if (location.pathname === "/" && Array.isArray(products) && products.length > 0) {
      const value = e.target.value;
      setSearchItem(value);
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()));
      if (value === "") {
        dispatch(clearProduct());
      } else {
        dispatch(updateProduct(filteredProducts));
      }
    }
  };

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
            <Navbar.Brand className="d-flex align-items-center text-white justify-content-center">
              <img
                src={logo}
                alt="Logo"
                style={{
                  maxHeight: 80,
                  borderRadius: "5%",
                  marginRight: 10,
                }}
              ></img>
              <h2 style={{ marginTop: 6, marginLeft: 10 }}>BCStore</h2>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="collapse-dark-bg ms-auto ps-2 pt-3 rounded">
            <Nav className="ms-auto">
              <Form className="">
                <InputGroup>
                  
                  <Form.Control
                    style={{
                      minWidth: "250px",
                      width: "300px",
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchItem}
                    onChange={handleSearch}
                    disabled={location.pathname !== "/"}
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
                  <div className="nav-dropdown-items">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  </div>
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
