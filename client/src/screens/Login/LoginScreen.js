import React, { useEffect, useState } from "react";
import { Row, Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { loginUser } from "../../slices/loginSlice";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

function LoginScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.login);

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) navigate(`${redirect}`);
  }, [userInfo, redirect, navigate]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  }

  return (
    <>
      <Meta title="Login" />
      <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant={"danger"}>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="my-3">
            Sign in
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link to={redirect ? `/signup` : "/register"}>Register here </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default LoginScreen;
