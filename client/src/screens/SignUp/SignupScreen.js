import React, {useEffect, useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import {signup} from "../../slices/signupSlice";

function SignupScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {error} = useSelector((state) => state.signup);

    const currentUser = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    useEffect(() => {
        if (currentUser) {
            navigate("/");
            navigate(0);
        }
    }, [currentUser]);

    function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPass) setMessage("Passwords do not match!");
        else dispatch(signup({email, password, name}));
    }

    return (
        <>
            <Meta title="Sign Up" />
            <FormContainer>
                <h1>Sign up</h1>
                {error && <Message variant={"danger"}>{error}</Message>}
                {message && <Message variant={"danger"}>{message}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="my-3">
                        Sign up
                    </Button>
                </Form>
                <Row>
                    <Col>
                        Already have an account?{" "}
                        <Link to={"/login"}>Click here to login.</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    );
}

export default SignupScreen;
