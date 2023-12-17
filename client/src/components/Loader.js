import React from "react";
import {Spinner} from "react-bootstrap";

function Loader() {
    return (
        <Spinner style={styles} animation="border" role="status">
            <span class="sr-only">Loading...</span>
        </Spinner>
    );
}

const styles = {
    width: "100px",
    height: "100px",
    margin: "auto",
    display: "block",
};

export default Loader;
