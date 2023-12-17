import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopProducts} from "../slices/productSlice";
import {Carousel, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function ProductsCarousel() {
    const dispatch = useDispatch();
    const {topProducts} = useSelector((state) => state.productsList);

    useEffect(() => {
        if (topProducts.length === 0) dispatch(fetchTopProducts());
    }, [dispatch, topProducts]);

    return (
        <>
            <div className="mt-5 line-container">
                <h1>Top rated this week</h1>
                <div className="line"></div>
            </div>
            <Carousel variant="dark">
                {topProducts.map((p) => (
                    <Carousel.Item key={p._id}>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={3}>
                                <Image src={p.image} fluid />
                            </Col>
                            <Col md={4}>
                                <Link to={`/products/${p._id}`}>
                                    <strong>{p.name}</strong>
                                    <h4>${p.price.toFixed(2)}</h4>
                                    <p>{p.description}</p>
                                </Link>
                            </Col>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default ProductsCarousel;
