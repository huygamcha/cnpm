import React, {useEffect, useState} from "react";
import {
    Row,
    Col,
    ListGroup,
    Card,
    Button,
    Image,
    Form,
    InputGroup,
} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import Rating from "../../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {createProductReview, fetchProductById} from "../../slices/productSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";

function ProductScreen() {
    const {id} = useParams();
    const [qty, setQty] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {loading, product, error} = useSelector(
        (state) => state.productsList
    );

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch]);

    function setOptions(opts) {
        return opts.map((item) => (
            <option key={item._id} value={item.value}>
                item
            </option>
        ));
    }

    function addToCartHandler() {
        if (qty !== "")
            navigate(`/cart/${id}?qty=${qty}`, {
                state: {product: product, qty: qty},
            });
    }

    function onSubmitHandler() {
        dispatch(createProductReview({id, rating, comment}));
    }

    return (
        <>
            <Meta title={product.name} />
            <Link to={"/"} className="btn btn-light my-3">
                <i class="fa-solid fa-arrow-left"></i> Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={4}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        stars={product.rating}
                                        reviews={product.numReviews}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>
                                        Price: ${" "}
                                        {Number(product.price).toFixed(2)}
                                    </h5>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span className="fw-bold">
                                        Description:
                                    </span>{" "}
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <span className="fw-bold">
                                                    ${" "}
                                                    {Number(
                                                        product.price
                                                    ).toFixed(2)}
                                                </span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In stock"
                                                    : "Out of stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Sizes</Col>
                                            <Col>
                                                <Form.Select required>
                                                    <option key="none" value="">
                                                        Select
                                                    </option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.countInStock > 0 ? (
                                            <Row>
                                                <Col>Quatity:</Col>
                                                <Col>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="number"
                                                            value={qty}
                                                            onChange={(e) =>
                                                                setQty(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                            defaultValue={0}
                                                            disabled={
                                                                qty >=
                                                                product.countInStock
                                                                    ? true
                                                                    : false
                                                            }
                                                        ></Form.Control>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <Row>Out of Stock</Row>
                                        )}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Button
                                                className="btn-block"
                                                type="button"
                                                disabled={
                                                    product.countInStock === 0
                                                }
                                                onClick={addToCartHandler}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={6}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3>Write a review</h3>
                                    {userInfo ? (
                                        <Form onSubmit={onSubmitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value={"0"}>
                                                        Select
                                                    </option>
                                                    <option value={"1"}>
                                                        1 - Poor
                                                    </option>
                                                    <option value={"2"}>
                                                        2 - Fair
                                                    </option>
                                                    <option value={"3"}>
                                                        3 - Good
                                                    </option>
                                                    <option value={"4"}>
                                                        4 - Very Good
                                                    </option>
                                                    <option value={"5"}>
                                                        5 - Excellent!!!
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as={"textarea"}
                                                    rows={5}
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                            >
                                                Post
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant={"primary"}>
                                            Log in to write your review.
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <h3>Reviews</h3>
                        {product.reviews?.length !== 0 ? (
                            product.reviews?.map((r) => (
                                <ListGroup
                                    variant="flush"
                                    className="mt-1"
                                    key={r._id}
                                >
                                    <ListGroup.Item>
                                        <strong>{r.name}</strong>
                                        <Rating stars={r.rating} />
                                        <p>{r.createdAt.substring(0, 10)}</p>
                                        <p>{r.comment}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))
                        ) : (
                            <Message>
                                This product have no review yet. Be the first
                                one to write it!
                            </Message>
                        )}
                    </Row>
                </>
            )}
        </>
    );
}

export default ProductScreen;
