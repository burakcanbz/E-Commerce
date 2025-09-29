import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiLogIn } from "react-icons/bi";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Logo from "../assets/buyzy.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        await register({ name, email, password }).unwrap();
        toast.success("Successfully registered.");
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <Image src={`${Logo}`} alt="Buyzy Logo" style={{ width: 150, marginBottom: 20, borderRadius: '50%' }} />
      <h2 className="mb-4">Sign Up to Buyzy!</h2>
      {isLoading ? <Loading /> :(
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
          <BiLogIn size={50} color="#0d6efd" />
          <h2 className="mt-2">Sign Up</h2>
        </div>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
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
    </div>
  );
};

export default Register;
