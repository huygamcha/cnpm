import React from "react";
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Meta from "../components/Meta";

function ErrorScreen() {
    return (
        <>
            <Meta title="Not found" />
            <div className="text-center">
                <h1>404 Error</h1>
                <p>Sorry, we can't find the page you are looking for.</p>
                <p>
                    If you're lost, try using our search bar in the top menu, or
                    to to our home page
                </p>
                <LinkContainer to={"/"}>
                    <Button variant="outline-primary">Return Home</Button>
                </LinkContainer>
            </div>
        </>
    );
}

export default ErrorScreen;
