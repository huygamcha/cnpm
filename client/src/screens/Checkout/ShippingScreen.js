import React from "react";
import {Button, Form} from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {saveShippingAddress} from "../../slices/cartSlice";
import CheckoutSteps from "../../components/CheckoutSteps";
import Meta from "../../components/Meta";

function ShippingScreen() {
    const dispatch = useDispatch();
    const {shipping} = useSelector((state) => state.cart);

    const navigate = useNavigate();

    const [address, setAddress] = useState(shipping.address);
    const [city, setCity] = useState(shipping.city);
    const [postalCode, setPostalCode] = useState(shipping.postalCode);
    const [country, setCountry] = useState(shipping.country);

    function submitHandler(e) {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate("/payment");
        console.log("submit");
    }

    return (
        <>
            <Meta title="Shipping" />
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="my-3">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
}

export default ShippingScreen;
