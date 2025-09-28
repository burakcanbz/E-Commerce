import { useDeferredValue, useState, useMemo, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Form,
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
import { clearCartItems, clearShippingAddress, removeFromCart } from "../slices/cartSlice";

const Header = () => {
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
    return products?.filter(product =>
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
      dispatch(updateProduct({filteredProducts}));
      return
    }
  }, [deferredValue, filteredProducts, dispatch]);

  return (
    <header>
      <Navbar expand="lg" className="fixed-top header shadow-sm" collapseOnSelect>
        <Container fluid className="d-flex align-items-center justify-content-between gap-5" style={{ padding: '0 100px 0 200px' }}>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-brand d-flex align-items-center text-white">
              <img
                src={logo}
                alt="Logo"
                style={{ maxHeight: 65, borderRadius: "50%", marginRight: 8 }}
              />
              <h2 className="brand-header">Buyzy</h2>
            </Navbar.Brand>
          </LinkContainer>

          <Form className="d-none d-lg-flex mx-3" style={{ width: '30%', margin: '0 auto' }}>
            <Form.Control
              type="search"
              placeholder="Search product with name..."
              style={{ fontSize: '0.9rem', height: '38px' }}
              value={searchItem}
              onChange={handleSearch}
              disabled={location.pathname !== "/"}
            />
          </Form>

          <div className="d-flex align-items-center">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="d-flex align-items-center gap-4">
                <LinkContainer to="/">
                  <Nav.Link className="menu-item">Home</Nav.Link>
                </LinkContainer>

                {/* Categories */}
                <NavDropdown
                  className="menu-item my-dropdown"
                  id="categories"
                  show={showDropdown === "categories"}
                  onMouseEnter={() => handleDropdown("categories")}
                  onMouseLeave={() => handleDropdown(null)}
                  title="Categories"
                >
                  <LinkContainer to="/electronics">
                    <NavDropdown.Item>Electronics</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/casual">
                    <NavDropdown.Item>Casual</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown
                  title={
                  <LinkContainer to="/cart">
                    <span>
                      <FaShoppingCart />
                      <span className="menu-item ms-1">Cart</span>{" "}
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
                >
                  <div>
                    {cartItems.length === 0 ? (
                      <NavDropdown.Item style={{color: 'white'}}disabled>No items in cart</NavDropdown.Item>
                    ) : (
                      cartItems.map((item) => (
                        <LinkContainer to={`/product/${item._id}`} key={item._id}>
                          <NavDropdown.Item className="d-flex align-items-center justify-content-between">
                            <span className="d-flex align-items-center gap-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: 36, height: 36, borderRadius: "50%" }}
                              />
                              <span style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </span>
                              <span>
                                (x{item.qty})
                              </span>
                            </span>
                            <button
                              className="btn btn-sm btn-danger"
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
                      <NavDropdown.Item disabled style={{color: 'white'}}>
                        Total: ${totalPrice}{" "}
                        <small><small><small>
                          (taxes {totalPrice > 100 ? "included. Shipping free" : "+ shipping included"})
                        </small></small></small>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <LinkContainer to="/cart">
                        <NavDropdown.Item>Go to Cart</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                </NavDropdown>

                {/* User */}
                {userInfo ? (
                  <NavDropdown
                    title={
                      <>
                        {userInfo.name}{" "}
                        {userInfo.image && (
                          <img
                            alt=""
                            src={userInfo.image}
                            style={{ width: 30, height: 28, borderRadius: "50%" }}
                          />
                        )}
                      </>
                    }
                    id="username"
                    show={showDropdown === "username"}
                    onMouseEnter={() => handleDropdown("username")}
                    onMouseLeave={() => handleDropdown(null)}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item className="menu-item" onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="menu-item">
                      <FaUser /> Login
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
