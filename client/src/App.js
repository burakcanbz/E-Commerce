import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import main from './assets/main.jpg';

const App = () => {
  return (
    <div
    style={{
      backgroundColor: 'rgb(241 245 249)',
      display: "flex",
      flexDirection: "column", 
      minHeight:"100vh"
    }}>
      <Header />
      <main className='py-3 d-flex' style={{flexGrow: 1}}>
        <Container>
          <Outlet/>
        </Container>
      </main> 
      <Footer />
      <ToastContainer/>
    </div>
  );
};

export default App;
