import React, {useEffect} from "react";
import {Row, Col, Image, Button} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useParams} from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductsCarousel from "../components/ProductsCarousel";
import Meta from "../components/Meta";

function HomeScreen() {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);

    const {keyword, pageNumber} = useParams();

    //const currentUser = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        dispatch(fetchProducts({keyword, pageNumber}));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />

            <Row>
                {productsList.loading ? (
                    <Loader />
                ) : productsList.error ? (
                    <Message variant="danger">{productsList.error}</Message>
                ) : (
                    <>
                        {!keyword ? (
                            <div className="banner">
                                <Image
                                    src="/images/banner.png"
                                    fluid
                                    alt="banner"
                                />
                                <div className="banner-content">
                                    <h3>
                                        Shop the Latest Trends with Our Online
                                        Store!
                                    </h3>
                                    <div className="banner-content-text">
                                        We have everything you need to look and
                                        feel your best.
                                    </div>
                                    <Button variant="outline-dark">
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <h1>Search Result for "{keyword}"</h1>
                        )}
                        {!keyword && <ProductsCarousel />}
                        {!keyword && (
                            <div className="my-5 line-container">
                                <h2 className="mt-3">Latest products</h2>{" "}
                                <div className="line"></div>
                            </div>
                        )}
                        {productsList.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </>
                )}
            </Row>
            <Paginate
                page={productsList.page}
                pages={productsList.pages}
                keyword={keyword ? keyword : ""}
            />
        </>
    );
}

export default HomeScreen;
