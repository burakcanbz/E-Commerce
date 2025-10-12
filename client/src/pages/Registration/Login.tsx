import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import { BiLogIn } from "react-icons/bi";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import CustomContainer from "../../components/Common/CustomContainer";
import Loading from "../../components/Common/Loading";
import Logo from "../../assets/buyzy.png";
import "./main.scss";

import type { JSX } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../types/redux";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const searchParams: URLSearchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const { isAdmin, ...user } = res;
      dispatch(setCredentials({ ...user }));
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
            Welcome Back to{" "}
            <span style={{ fontFamily: "Fredoka One, sans-serif" }}>Buyzy</span>
          </h2>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Card
            className="p-4 shadow-lg rounded-4"
            style={{
              maxWidth: 450,
              minHeight: 500,
              width: "100%",
              margin: "auto",
              background: "white",
            }}
          >
            <div className="text-center mb-4">
              <BiLogIn size={70} color="#0d6efd" />
              <h2 className="mt-0">Sign In</h2>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="placeholder-secondary"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  style={{ borderRadius: 8, padding: "10px 12px" }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="placeholder-secondary"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  style={{ borderRadius: 8, padding: "10px 12px" }}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 mb-3"
                disabled={isLoading}
                style={{ borderRadius: 8 }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Form>

            <Row className="text-center mt-3">
              <Col>
                Don't have an account?{" "}
                <Link to={redirect ? `/register?redirect=/login` : "/register"}>
                  Sign Up
                </Link>
              </Col>
            </Row>
          </Card>
        )}
      </CustomContainer>
    </motion.div>
  );
};

export default Login;
