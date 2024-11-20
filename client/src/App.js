import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {

  const color = useSelector(state => state.settings.settings);
  
  return (
    <div
    style={{
      backgroundColor: `rgba${color}`,
      display: "flex",
      flexDirection: "column", 
      minHeight:"100vh"
    }}>
      <Header/>
      <main className='py-3 d-flex' style={{flexGrow: 1, marginTop: 120}}>
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
