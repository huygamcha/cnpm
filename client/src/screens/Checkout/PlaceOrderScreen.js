import React, {useEffect} from "react";
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Message from "../../components/Message";
import CheckoutSteps from "../../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../slices/orderSlice";
import Meta from "../../components/Meta";

function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    console.log(itemsPrice);

    const shippingPrice = itemsPrice > 100 ? 100 : 0;
    const taxPrice = Math.round((0.1 * itemsPrice * 100) / 100);
    const totalPrice = taxPrice + itemsPrice;

    const {success, order, error} = useSelector((state) => state.order);
    const navigate = useNavigate();

    useEffect(() => {
        if (success) navigate(`/order/${order._id}`);
    }, [success]);

    function placeOrderHandler() {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shipping,
                paymentMethod: cart.payment,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        );
    }

    return (
        <>
            <Meta title="Place Order" />
            <CheckoutSteps step1 step2 step3 step4 />
            {error && <Message variant="danger">{error}</Message>}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>{" "}
                                {cart.shipping.address}, {cart.shipping.city},{" "}
                                {cart.shipping.postalCode},{" "}
                                {cart.shipping.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {cart.payment}
                            </p>
                        </ListGroup.Item>
                        <ListGroup>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                                    {item.qty} x $ {item.price}{" "}
                                                    ={" $"}
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup>
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
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        disabled={cart.cartItem === 0}
                                        type="button"
                                        onClick={placeOrderHandler}
                                    >
                                        Order Now
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default PlaceOrderScreen;
