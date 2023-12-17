import React from "react";
import {Button, Col, Form, FormCheck, Image} from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import {savePaymentMethod} from "../../slices/cartSlice";
import Meta from "../../components/Meta";

const paypalImg = "/images/payments/paypal.png";
const kidneyImg = "/images/payments/kidney.png";

function PaymentScreen() {
    const dispatch = useDispatch();
    const {shipping} = useSelector((state) => state.cart);

    const navigate = useNavigate();

    if (!shipping) navigate("/shipping");

    const [paymentMethod, setPayment] = useState("Paypal");

    function submitHandler(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }

    return (
        <>
            <Meta title="Payment" />
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>
                        <Col>
                            <Form.Check type="radio" id="paypal">
                                <FormCheck.Input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Paypal"
                                    onChange={(e) => setPayment(e.target.value)}
                                ></FormCheck.Input>
                                <FormCheck.Label>
                                    <Image src={paypalImg} thumbnail /> Paypal
                                </FormCheck.Label>
                            </Form.Check>
                        </Col>
                        <Col>
                            <Form.Check type="radio" id="card">
                                <FormCheck.Input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Card"
                                    onChange={(e) => setPayment(e.target.value)}
                                ></FormCheck.Input>
                                <FormCheck.Label>
                                    <Image src={kidneyImg} thumbnail /> Card
                                </FormCheck.Label>
                            </Form.Check>
                        </Col>
                        <Col>
                            <Form.Check type="radio" id="kidney">
                                <FormCheck.Input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Kidney"
                                    onChange={(e) => setPayment(e.target.value)}
                                ></FormCheck.Input>
                                <FormCheck.Label>
                                    <Image src={kidneyImg} thumbnail /> Kidney
                                </FormCheck.Label>
                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type="submit" className="my-3">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
}

export default PaymentScreen;
