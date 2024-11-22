import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { imageToBase64 } from "../utils/helpers";
import Message from "../components/Message";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/login";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await register({ name, email, password, image }).unwrap();
        toast.success("Successfully registered.");
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        toast.error('Maybe image size bigger than expected.')
      }
    }
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    const image = await imageToBase64(file)
    if (image) {
      setImage(image);
    }
  };

  return (
    <FormContainer>
      <Card className=" my-3 p-3 rounded d-flex align-items-center border-0" style={{backgroundColor: "rgba(230, 230, 230)"}}>
        <Form.Group controlId="image" className="position-relative mb-3">
          <Form.Label
            className="position-absolute"
            style={{
              color: 'black',
              top: "230%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: '20%'
            }}
          >{
            image ? (<strong><span>Edit Image</span></strong>): (<strong><span>Upload Image</span></strong>)
          }
          </Form.Label>
          <Form.Control
            style={{ visibility: "hidden" }}
            type="file"
            onChange={handleImageChange}
          />
          {image ? (
            <img
              src={image}
              alt="Preview"
              style={{
                marginTop: 20,
                width: "82px",
                height: "82px",
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            />
          ) : (
            <FaRegUserCircle
              style={{
                marginTop: 20,
                fontSize: 80,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            />
          )}
        </Form.Group>

        <h1 className="mt-5">Sign Up</h1>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              disabled={isLoading}
            >
              Register
            </Button>
            {isLoading && <Loading />}
          </Form>

          <Row>
            <Col className="mt-3">
              Already have an account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default Register;
