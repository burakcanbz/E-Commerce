import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../../slices/usersApiSlice";

import CustomContainer from "../../components/Common/CustomContainer";
import Loading from "../../components/Common/Loading";
import Logo from "../../assets/buyzy.png";
import "./main.scss";

import type { JSX } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type { RootState, UserInfo } from "../../types/redux";

const Register = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo }: {userInfo : UserInfo | null } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/login";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await register({ name, email, password }).unwrap();
        toast.success("Successfully registered.");
        navigate(redirect);
      } catch (err) {
        if ((err as FetchBaseQueryError)?.data) {
          toast.error(
            ((err as FetchBaseQueryError)?.data as any)?.message ||
              "Something went wrong"
          );
        } else {
          toast.error(
            (err as SerializedError)?.message || "Something went wrong"
          );
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <CustomContainer>
        <div className="text-center">
          <Image
            src={`${Logo}`}
            alt="Buyzy Logo"
            style={{ width: 150, marginBottom: 20, borderRadius: "50%" }}
          />
          <h2 className="mb-4">
            Sign Up to{" "}
            <span style={{ fontFamily: "Fredoka One, sans-serif" }}>Buyzy</span>
          </h2>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Card
            className="p-5 shadow-lg rounded-4"
            style={{
              maxWidth: 450,
              minHeight: 500,
              width: "100%",
              margin: "auto",
              background: "white",
            }}
          >
            <div className="text-center mb-2">
              <BiUserCircle size={80} color="#0d6efd" />
              <h2 className="mt-0">Sign Up</h2>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="placeholder-secondary"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: 8, padding: "10px 12px" }}
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="placeholder-secondary"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: 8, padding: "10px 12px" }}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="placeholder-secondary"
                  type="password"
                  placeholder="Enter yourpassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: 8, padding: "10px 12px" }}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="placeholder-secondary"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ borderRadius: 8, padding: "10px 12px" }}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 mt-3 mb-3"
                disabled={isLoading}
              >
                Register
              </Button>
            </Form>

            <Row className="text-center mt-3">
              <Col>
                Already have an account?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Sign In
                </Link>
              </Col>
            </Row>
          </Card>
        )}
      </CustomContainer>
    </motion.div>
  );
};

export default Register;
