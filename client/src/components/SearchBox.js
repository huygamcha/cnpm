import React, {useState} from "react";
import {Form, InputGroup, OverlayTrigger, Popover} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function SearchBox() {
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    }

    const popover = (
        <Popover id="popover-contained" style={{width: "500px"}}>
            <Popover.Body>
                <Form onSubmit={submitHandler}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            name="q"
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search product..."
                            size="sm"
                        ></Form.Control>
                    </InputGroup>
                </Form>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger={"click"}
            placement="bottom"
            overlay={popover}
            container={this}
        >
            <a className="me-3" role="button">
                <i
                    class="fa-solid fa-magnifying-glass"
                    style={{color: "#fff"}}
                ></i>
            </a>
        </OverlayTrigger>
    );
}

export default SearchBox;
