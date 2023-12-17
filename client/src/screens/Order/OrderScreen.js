import React, {useEffect, useState} from "react";
import {Row, Col, ListGroup, Card, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {getOrderById} from "../../slices/orderSlice";
import {Link} from "react-router-dom";
import axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import {updateOrderToPaid} from "../../slices/orderPaySlice";

function OrderScreen() {
    const dispatch = useDispatch();
    const {order, error, loading} = useSelector((state) => state.order);
    const orderPay = useSelector((state) => state.orderPay);

    const {id} = useParams();

    const [sdkReady, setSdkReady] = useState(false);

    const successPaymentHandler = (paymentResult) => {
        dispatch(updateOrderToPaid({id, paymentResult}));
    };

    const itemPrice = order.orderItems?.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    useEffect(() => {
        dispatch(getOrderById(id));

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get("/api/payment/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || orderPay.success) {
            dispatch(getOrderById(id));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderPay.success]);

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
                                    Your order has been delivered.
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
                            <ListGroup>
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen;
