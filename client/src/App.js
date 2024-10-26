import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column", 
      minHeight:"100vh"
    }}>
      <Header />
      <main className='py-3' style={{flexGrow: 1}}>
        <Container>
          <Outlet/>
        </Container>
      </main> 
      <Footer />
    </div>
  );
};

export default App;
