import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Col, Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setCredentials } from "../../slices/authSlice";
import { useUpdateMutation } from "../../slices/usersApiSlice";
import "./Profile.css";

const UserInformation = () => {
  const user = useSelector((state) => state.auth?.userInfo);

  const dispatch = useDispatch();
  const [update] = useUpdateMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setInitials = useCallback(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPassword("");
    setConfirmPassword("");
  }, [user?.name, user?.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setInitials();
      toast.error("Password not matched.");
    } else if (password.length === 0 && confirmPassword.length === 0) {
      setInitials();
      toast.error("Enter your password and confirm password then try again.");
    } else {
      const resp = await update({
        name,
        email,
        password,
        image: user.image,
        confirmPassword,
      }).unwrap();
      if (resp) {
        toast.success("Updated successfully!");
        setInitials();
        dispatch(setCredentials(resp));
      } else {
        setInitials();
        toast.error("Update Failed!");
      }
    }
  };

  useEffect(() => {
    setInitials();
  }, [setInitials]);

  return (
    <Col sm={10} lg={4} className="mx-sm-auto mt-4">
      <Card
        id="user-information"
        className="user-info glass-card shadow-lg p-4 rounded-4 border-0"
      >
        <h3
          className="text-center mb-4 fw-semibold"
          style={{ letterSpacing: 1 }}
        >
          Update Profile
        </h3>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-4">
            <Form.Label className="fw-semibold ">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="rounded-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-4">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="rounded-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              className="rounded-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-4">
            <Form.Label className="fw-semibold">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              className="rounded-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <div className="text-center">
            <Button
              id="update-button"
              type="submit"
              variant="light"
              className="update-button mt-2 px-4 py-2 fw-semibold rounded-pill shadow-sm"
            >
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </Col>
  );
};

export default UserInformation;
