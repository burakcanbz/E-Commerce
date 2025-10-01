import { useDeferredValue, useState, useMemo, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Form,
  Offcanvas,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";

import { logout } from "../slices/authSlice";
import { useGetPaginatedProductsQuery } from "../slices/productsApiSlice";
import { clearOrder } from "../slices/orderSlice";
import { updateProduct, clearProduct } from "../slices/productSlice";
import logo from "../assets/buyzy.png";
import { FaTrash } from "react-icons/fa";
import {
  clearCartItems,
  clearShippingAddress,
  removeFromCart,
} from "../slices/cartSlice";
import Typewriter from "typewriter-effect";

const Header = () => {
  const isDesktop = window.innerWidth >= 992;
  const pathName = window.location.pathname.split("/")[1];
  const [showDropdown, setShowDropdown] = useState(null);
  const location = useLocation();
  const [searchItem, setSearchItem] = useState("");
  const deferredValue = useDeferredValue(searchItem);

  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetPaginatedProductsQuery({ page: 1, limit: 6 });

  const electronics = data?.electronics;
  const casual = data?.casual;
  const products = electronics && casual ? electronics.concat(casual) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); //Promise-like object
      dispatch(logout());
      dispatch(clearOrder());
      dispatch(clearCartItems());
      dispatch(clearShippingAddress());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    if (location.pathname === "/" && Array.isArray(products)) {
      const value = e.target.value;
      setSearchItem(value);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products?.filter((product) =>
      product.name.toLowerCase().includes(deferredValue.toLowerCase())
    );
  }, [deferredValue, products]);

  const handleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const removeFromCartHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (deferredValue === "") {
      dispatch(clearProduct());
      return;
    }
    if (Array.isArray(filteredProducts)) {
      dispatch(updateProduct({ filteredProducts }));
      return;
    }
  }, [deferredValue, filteredProducts, dispatch]);

  return (
    <header>
        <Navbar
          expand="lg"
          className="fixed-top header shadow-sm"
          collapseOnSelect
        >
          <Container
            fluid
            className="custom-header d-flex align-items-center justify-content-between"
          >
            <LinkContainer to="/">
              <Navbar.Brand className="nav-brand d-flex align-items-center text-white">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ maxHeight: 70, borderRadius: "50%", marginRight: 8 }}
                />
                <h2 className="brand-header">Buyzy</h2>
              </Navbar.Brand>
            </LinkContainer>
            {pathName === "" ? (
              <Form
                className="d-none d-xl-flex mx-3"
                style={{ width: "30%", margin: "0 auto" }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search product with name..."
                  style={{ fontSize: "0.9rem", height: "38px" }}
                  value={searchItem}
                  onChange={handleSearch}
                  disabled={location.pathname !== "/"}
                />
              </Form>
            ) : pathName === "login" ||
              pathName === "register" ||
              !isDesktop ? (
              <></>
            ) : (
              <Typewriter
                className="buyzy"
                options={{
                  strings: [`${pathName[0].toUpperCase() + pathName.slice(1)}`],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  pauseFor: 1000 * 60 * 60,
                  deleteSpeed: 100,
                  cursor: "",
                  wrapperClassName: "buyzy",
                  cursorClassName: "typewriter-cursor",
                }}
              />
            )}
            <div className="d-flex align-items-center">

            <Navbar.Toggle aria-controls="offcanvasNavbar" />

            {/* Offcanvas */}
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="d-flex flex-lg-row align-items-start gap-2">
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>

                  {/* Categories */}
                  <NavDropdown
                    title="Categories"
                    show={showDropdown === "categories"}
                    onMouseEnter={() => handleDropdown("categories")}
                    onMouseLeave={() => handleDropdown(null)}
                  >
                    <LinkContainer to="/electronics">
                      <NavDropdown.Item>Electronics</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/casual">
                      <NavDropdown.Item>Casual</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  {/* Cart */}
                  <NavDropdown
                    title={
                      <span>
                        <FaShoppingCart />
                        <span className="ms-1">Cart</span>
                        {cartItems.length > 0 && (
                          <Badge pill bg="success" className="ms-1">
                            {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                          </Badge>
                        )}
                      </span>
                    }
                    show={showDropdown === "cart-dropdown"}
                    onMouseEnter={() => handleDropdown("cart-dropdown")}
                    onMouseLeave={() => handleDropdown(null)}
                  >
                    {cartItems.length === 0 ? (
                      <NavDropdown.Item disabled>
                        No items in cart
                      </NavDropdown.Item>
                    ) : (
                      cartItems.map((item) => (
                        <NavDropdown.Item
                          key={item._id}
                          className="d-flex align-items-center justify-content-between"
                          style={{ minWidth: 250, maxWidth: 300 }}
                          onClick={() =>
                            window.open(`/product/${item._id}`, "_blank")
                          }
                        >
                          <span className="d-flex align-items-center gap-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                              }}
                            />
                            <span
                              style={{
                                maxWidth: 150,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.name}
                            </span>
                            <span>(x{item.qty})</span>
                          </span>
                          <FaTrash
                            color="red"
                            onClick={(e) => removeFromCartHandler(e, item._id)}
                          />
                        </NavDropdown.Item>
                      ))
                    )}
                    {cartItems.length > 0 && (
                      <>
                        <NavDropdown.Divider />
                        <div>
                        <LinkContainer className="w-100" to="/cart">
                          <NavDropdown.Item>Go to Cart</NavDropdown.Item>
                        </LinkContainer>
                        </div>
                      </>
                    )}
                  </NavDropdown>

                  {/* User */}
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      show={showDropdown === "username"}
                      onMouseEnter={() => handleDropdown("username")}
                      onMouseLeave={() => handleDropdown(null)}
                    >
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
                        <FaUser /> Login
                      </Nav.Link>
                    </LinkContainer>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
    </header>
  );
};

export default Header;
