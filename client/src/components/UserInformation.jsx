import React, { useEffect, useState } from "react";
import { Col, Button, Alert, Card, Form } from "react-bootstrap";
import { useUpdateMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { setScreenMode, setClearScreenMode } from "../slices/settingsSlice";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const UserInformation = () => {
  const user = useSelector((state) => state.auth?.userInfo);
  const dispatch = useDispatch();
  const [update] = useUpdateMutation();

  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setInitials = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setConfirmPassword('');
  };

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
  }, [user, user.name, user.email]);

  useEffect(() => {
    if (isChecked) {
      dispatch(setScreenMode('(0 0 0)'))
    } else {
      dispatch(setClearScreenMode())
    }
  }, [isChecked]); 


  return (
    <Col md={4}>
      <Alert variant="secondary" className="text-center">
        <h2>PROFILE</h2>
      </Alert>
      <Card className="p-3 ps-3">
      <Form>
          <Form.Check
            type="checkbox"
            id="dark"
            label="Dark Mode"
            className="fs-5 fw-normal"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </Form>
      </Card>
      <Card
        className="shadow-lg my-3 p-3 rounded d-flex align-items-center justify-content-center bg-light"
        style={{ minHeight: 500 }}
      >
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-4"
          >
            Update
          </Button>
        </Form>
      </Card>
    </Col>
  );
};

export default UserInformation;
