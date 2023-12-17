import {useEffect} from "react";
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchSale} from "../../slices/productSlice";
import Loader from "../../components/Loader";
import Product from "../../components/Product";

const SaleScreen = () => {
    const dispatch = useDispatch();
    const {loading, products} = useSelector((state) => state.productsList);

    useEffect(() => {
        dispatch(fetchSale({pageNumber: 1}));
    }, [dispatch]);

    return (
        <Container>
            <div className="explore-title">
                <h2>Shop</h2>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>On Sale</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <Row>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {products.length ? (
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
                                <div className="center-container ">
                                    {`It's look like there is no sale yet, please
                                        come back another time :(`}
                                </div>
                            )}
                        </>
                    )}
                </Row>
            </div>
        </Container>
    );
};
export default SaleScreen;
