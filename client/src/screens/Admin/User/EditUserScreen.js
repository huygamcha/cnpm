import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Meta from "../../../components/Meta";
import {getUserById, updatePrivateUser} from "../../../slices/usersSlice";

function EditUserScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    const dispatch = useDispatch();
    const {error, loading, user} = useSelector((state) => state.users);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!user.name || user._id !== id) {
                dispatch(getUserById(id));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        } else {
            navigate("/");
        }
    }, [dispatch, user]);

    function submitHandler(e) {
        e.preventDefault();
        dispatch(
            updatePrivateUser({
                id: user._id,
                name: name,
                email: email,
                isAdmin: isAdmin,
            })
        );
    }

    return (
        <Container>
            <Meta title="Edit User" />
            <Link to={"/admin/users"} className="btn btn-light my-3">
                <i class="fa-solid fa-arrow-left"></i> Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant={"danger"}>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isAdmin" className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type="submit" className="my-3">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </Container>
    );
}

export default EditUserScreen;
