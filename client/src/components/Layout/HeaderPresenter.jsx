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
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { spacer } from "../../utils/helpers";
import Typewriter from "typewriter-effect";
import logo from "../../assets/buyzy.png";

const HeaderPresenter = ({
    pathName,
    isDesktop,
    showCanvas,
    handleShowOffcanvas,
    handleCloseOffcanvas,
    logoutHandler,
    cartItems,
    userInfo,
    handleSearch,
    searchItem,
    removeFromCartHandler
}) => 
  (
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
          <Navbar.Brand
            as={Link}
            to="/"
            className="nav-brand d-flex align-items-center text-white"
          >
            <img
              src={logo}
              alt="Logo"
              className="header-logo"
            />
            <h2 className="brand-header">Buyzy</h2>
          </Navbar.Brand>
          {pathName === "" ? (
            <Form
              className="header-search-bar d-none d-xl-flex mx-3"
            >
              <Form.Control
                type="search"
                placeholder="Search product with name..."
                style={{ fontSize: "0.9rem", height: "38px" }}
                value={searchItem}
                onChange={handleSearch}
                disabled={pathName !== ""}
              />
            </Form>
          ) : ( isDesktop &&
            <Typewriter
              className="buyzy"
              options={{
                strings: [`${spacer()}Welcome to Buyzy!`, `${spacer()}Enjoy your shopping`, `${spacer()}Fast delivery to your door`],
                autoStart: true,
                loop: true,
                delay: 100,
                pauseFor: 5000,
                deleteSpeed: 100,
                cursor: "",
                wrapperClassName: "buyzy",
                cursorClassName: "typewriter-cursor",
              }}
            />
          )}
          <div className="d-flex align-items-center">
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShowOffcanvas} />

            {/* Offcanvas */}
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="top"
              show={showCanvas}
              className="half-height-canvas-menu"
              onHide={handleCloseOffcanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="d-flex flex-lg-row align-items-start gap-2">
                  <Nav.Link as={Link} to="/" onClick={handleCloseOffcanvas}>
                    Home
                  </Nav.Link>

                  {/* Categories */}
                  <NavDropdown
                    title="Categories"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/category?category=electronics"
                      onClick={handleCloseOffcanvas}
                    >
                      Electronics
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/category?category=casual"
                      onClick={handleCloseOffcanvas}
                    >
                      Casual
                    </NavDropdown.Item>
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
                  >
                    {cartItems.length === 0 ? (
                      <NavDropdown.Item style={{ color: "white" }} disabled>
                        No items in cart
                      </NavDropdown.Item>
                    ) : (
                      cartItems.map((item) => (
                        <NavDropdown.Item
                          key={item._id}
                          className="header-cart d-flex align-items-center justify-content-between"
                          onClick={() =>
                            window.open(`/product/${item._id}`, "_blank")
                          }
                        >
                          <span className="d-flex align-items-center gap-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-img"
                            />
                            <span
                              className="cart-item-name"
                            >
                              {item.name}
                            </span>
                            <span>(x{item.qty})</span>
                          </span>
                          <FaTrash
                            className="ms-2"
                            color="red"
                            onClick={(e) => removeFromCartHandler(e, item._id)}
                          />
                        </NavDropdown.Item>
                      ))
                    )}
                    {cartItems.length > 0 && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          as={Link}
                          to="/cart"
                          className="w-100"
                          onClick={handleCloseOffcanvas}
                        >
                          Go to Cart
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>

                  {/* User */}
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/profile"
                        onClick={handleCloseOffcanvas}
                      >
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Nav.Link as={Link} to="/login" onClick={handleCloseOffcanvas}>
                      <FaUser /> Login
                    </Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Container>
      </Navbar>
    </header>
  );

export default HeaderPresenter
