import {useEffect} from "react";
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../slices/productSlice";
import Loader from "../../components/Loader";
import Product from "../../components/Product";

const AllProductsScreen = () => {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);

    useEffect(() => {
        dispatch(fetchProducts({pageNumber: 1}));
    }, [dispatch]);

    return (
        <Container>
            <div className="explore-title">
                <h2>Shop</h2>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>All Product</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <Row>
                    {productsList.loading ? (
                        <Loader />
                    ) : (
                        <>
                            {productsList.products.map((product) => (
                                <Col
                                    key={product._id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <Product product={product} />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </div>
        </Container>
    );
};
export default AllProductsScreen;
