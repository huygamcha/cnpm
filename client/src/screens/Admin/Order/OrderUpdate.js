import React, {useEffect} from "react";
import {Row, Col, ListGroup, Card, Image, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {Link} from "react-router-dom";
import {getOrderById, updateOrderToDelivered} from "../../../slices/orderSlice";

function OrderUpdateScreen() {
    const dispatch = useDispatch();
    const {order, error, loading} = useSelector((state) => state.order);

    const {id} = useParams();
    const navigate = useNavigate();

    const itemPrice = order.orderItems?.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrderById(id));
        } else {
            navigate("/404");
        }
    }, [dispatch]);

    function markAsDeliveredHandler() {
        dispatch(updateOrderToDelivered(id));
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <Row>
                <h1>Order {order._id}</h1>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user?.name}
                            </p>
                            <p>
                                <strong>Email: </strong> {order.user?.email}
                            </p>
                            <p>
                                <strong>Address: </strong>{" "}
                                {order.shippingAddress?.address},{" "}
                                {order.shippingAddress?.city},{" "}
                                {order.shippingAddress?.postalCode},{" "}
                                {order.shippingAddress?.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant={"success"}>
                                    Delivered at{" "}
                                    {order.deliveredAt.substring(0, 10)}
                                </Message>
                            ) : (
                                <Message variant={"danger"}>
                                    Not delivered
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <strong>Method: </strong>
                            {order.isPaid}
                            {order.isPaid ? (
                                <Message variant={"success"}>
                                    Paid at {order.paidAt}.
                                </Message>
                            ) : (
                                <Message variant={"danger"}>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems?.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                order.orderItems?.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col>
                                                <Link
                                                    to={`/product/${item._id}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x $ {item.price} =
                                                {" $"}
                                                {(
                                                    item.qty * item.price
                                                ).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Sumary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemPrice?.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>
                                        ${order.shippingPrice?.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice?.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice?.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isDelivered && (
                                <ListGroup.Item>
                                    <Row>
                                        <Button
                                            className="btn btn-dark"
                                            onClick={markAsDeliveredHandler}
                                        >
                                            Mark as delivered
                                        </Button>
                                    </Row>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderUpdateScreen;
