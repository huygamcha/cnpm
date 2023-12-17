import {useEffect} from "react";
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getProductsBrand} from "../../slices/brandSlice";
import Loader from "../../components/Loader";
import Product from "../../components/Product";
import {useParams} from "react-router-dom";

const BrandScreen = () => {
    const dispatch = useDispatch();
    const {products, loading} = useSelector((state) => state.brands);

    const {id} = useParams();

    useEffect(() => {
        dispatch(getProductsBrand(id));
    }, [dispatch, id]);

    return (
        <Container>
            <div className="explore-title">
                <h2>Shop</h2>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/explore">Brand</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {products ? products[0]?.brand?.name : "404"}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <Row>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Col
                                        key={product._id}
                                        sm={12}
                                        md={6}
                                        lg={4}
                                        xl={3}
                                    >
                                        <Product product={product} />
                                    </Col>
                                ))
                            ) : (
                                <div className="center-container">
                                    There is no products for this brand yet.
                                </div>
                            )}
                        </>
                    )}
                </Row>
            </div>
        </Container>
    );
};
export default BrandScreen;
