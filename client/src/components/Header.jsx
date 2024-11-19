import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
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
import { removeFromCart } from "../slices/cartSlice";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  const location = useLocation();
  const [searchItem, setSearchItem] = useState("");

  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
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
    if (
      location.pathname === "/" &&
      Array.isArray(products) &&
      products.length > 0
    ) {
      const value = e.target.value;
      setSearchItem(value);
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      if (value === "") {
        dispatch(clearProduct());
      } else {
        dispatch(updateProduct(filteredProducts));
      }
    }
  };

  const handleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const removeFromCartHandler = (e, id) => {
    e.preventDefault(); // Prevents any default action (like navigation)
    e.stopPropagation();
    dispatch(removeFromCart(id));
  };

  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        className="fixed-top header shadow-sm "
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-brand d-flex align-items-center text-white">
              <img
                src={logo}
                alt="Logo"
                style={{
                  maxHeight: 80,
                  borderRadius: "5%",
                  marginRight: 10,
                }}
              ></img>
              <h2 className="brand-header">BCStore</h2>
            </Navbar.Brand>
          </LinkContainer>
          <Form className="d-none d-lg-flex justify-content-center w-50">
            <Form.Control
            className="search-bar"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchItem}
              onChange={handleSearch}
              disabled={location.pathname !== "/"}
            />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="collapse-dark-bg ms-auto ps-2 rounded d-flex justify-content-between align-items-center"
          >
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <NavDropdown
                className="my-dropdown"
                id="categories"
                show={showDropdown === "categories"}
                onMouseEnter={() => handleDropdown("categories")}
                onMouseLeave={() => handleDropdown(null)}
                variant="pills"
                title="Categories"
              >
                <div className="nav-dropdown-items">
                  <LinkContainer to="/electronics">
                    <NavDropdown.Item className="my-dropdown-item">
                      Electronics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/casual">
                    <NavDropdown.Item className="my-dropdown-item">
                      Casual
                    </NavDropdown.Item>
                  </LinkContainer>
                </div>
              </NavDropdown>
              <NavDropdown
                title={
                  <LinkContainer to="/cart">
                    <span>
                      <FaShoppingCart />
                      <span className="ms-1">Cart</span>{" "}
                      {cartItems.length > 0 && (
                        <Badge pill bg="success" className="ms-1">
                          {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                        </Badge>
                      )}
                    </span>
                  </LinkContainer>
                }
                id="cart-dropdown"
                show={showDropdown === "cart-dropdown"}
                onMouseEnter={() => handleDropdown("cart-dropdown")}
                onMouseLeave={() => handleDropdown(null)}
                className="d-flex cart-dropdown my-dropdown"
              >
                <div>
                  {cartItems.length === 0 ? (
                    <NavDropdown.Item
                      className="nav-dropdown-items my-dropdown-item"
                      disabled
                    >
                      No items in cart
                    </NavDropdown.Item>
                  ) : (
                    cartItems.map((item) => (
                      <LinkContainer to={`/product/${item._id}`}>
                        <NavDropdown.Item
                          key={item._id}
                          className="nav-dropdown-items my-dropdown-item"
                        >
                          <span>
                            <img
                              src={item.image}
                              style={{
                                height: 36,
                                width: 36,
                                borderRadius: 50,
                              }}
                            />{" "}
                            {item.name} (x{item.qty})
                          </span>
                          <button
                            className="btn btn-sm bg-danger ms-3"
                            onClick={(e) => removeFromCartHandler(e, item._id)}
                          >
                            Remove
                          </button>
                        </NavDropdown.Item>
                      </LinkContainer>
                    ))
                  )}
                </div>
                {cartItems.length > 0 && (
                  <>
                    <NavDropdown.Item className="nav-dropdown-items my-dropdown-item" disabled>
                      <span>Total Price <small>(taxes included)</small>: ${totalPrice}</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="nav-dropdown-items my-dropdown-item">
                      <LinkContainer to="/cart">
                        <span>Go to Cart</span>
                      </LinkContainer>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              {userInfo ? (
                <>
                <NavDropdown
                  className="my-dropdown"
                  id="username"
                  show={showDropdown === "username"}
                  onMouseEnter={() => handleDropdown("username")}
                  onMouseLeave={() => handleDropdown(null)}
                  title={ <>{userInfo.name}  {userInfo.image !== undefined &&<img src={userInfo.image} style={{ width:'30px', height: '28px', borderRadius: '50%'}} /> }</>}
                >
                  <div className="nav-dropdown-items">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="my-dropdown-item">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="my-dropdown-item"
                    >
                      Logout
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                </>
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
