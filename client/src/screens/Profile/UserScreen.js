import React, {useEffect} from "react";
import {Button, Row, Col, Form, Table, Image, Stack} from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../slices/userDetailsSlice";
import {useNavigate} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {getMyOrders} from "../../slices/orderListSlice";
import Meta from "../../components/Meta";
import axios from "axios";

function UserScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState();
    const [avatar, setAvatar] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, error, success} = useSelector((state) => state.userDetails);
    const orderList = useSelector((state) => state.orderList);

    const {userInfo} = useSelector((state) => state.login);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setAvatar(userInfo.avatar);
            dispatch(getMyOrders());
        } else {
            navigate("/login");
        }
    }, [dispatch, userInfo, navigate]);

    function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPass) setMessage("Passwords do not match!");
        else {
            dispatch(
                updateUser({
                    id: userInfo._id,
                    email: email,
                    password: password,
                    name: name,
                    avatar,
                })
            );
        }
    }

    async function uploadFileHandler(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const {data} = await axios.post("/api/upload", formData, config);

            setAvatar(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Meta title={userInfo.name} />
            <Row>
                <Col md={4}>
                    <h1>My Profile</h1>
                    {loading && <Loader />}
                    {error && <Message variant={"danger"}>{error}</Message>}
                    {message && <Message variant={"danger"}>{message}</Message>}
                    {success && (
                        <Message variant={"success"}>
                            {"Update successfully."}
                        </Message>
                    )}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="avatar">
                            <Stack direction="horizontal" gap={1}>
                                <Image
                                    src={avatar}
                                    roundedCircle
                                    className="avatar "
                                />
                                <Form.Control
                                    type="file"
                                    size="sm"
                                    onChange={uploadFileHandler}
                                />
                            </Stack>
                        </Form.Group>
                        <h5 className="header-form">
                            It's all about you baby!!
                        </h5>
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
                        <h5 className="header-form">Change Password</h5>
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
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <h1>My Orders</h1>
                    {orderList.loading ? (
                        <Loader />
                    ) : orderList.error ? (
                        <Message variant={"danger"}>orderList.error</Message>
                    ) : (
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className="table-sm"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {order.createdAt?.substr(0, 10)}
                                        </td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {order.isPaid
                                                ? order.paidAt?.substr(0, 10)
                                                : "No"}
                                        </td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt?.substr(
                                                      0,
                                                      10
                                                  )
                                                : "No"}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                <Button
                                                    className="btn-sm"
                                                    variant="light"
                                                >
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default UserScreen;
