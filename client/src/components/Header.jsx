import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/b.png";

const Header = () => {

  const { cartItems } = useSelector(state => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="Logo"
                style={{ maxHeight: 50, borderRadius: "50%", marginRight: 10 }}
              ></img> 
              BcShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{margingLeft: '5px'}}>
                      { cartItems.reduce((acc, cur) => { return acc + cur.qty }, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
