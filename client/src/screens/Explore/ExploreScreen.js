import {useEffect} from "react";
import {
    Breadcrumb,
    Card,
    Col,
    Container,
    Row,
    Tab,
    Tabs,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/Loader";
import {getAllBrands} from "../../slices/brandSlice";
import {getAllCategories} from "../../slices/categorySlice";
import {Link} from "react-router-dom";

const ExploreScreen = () => {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands);
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(getAllCategories());
    }, [dispatch]);

    const setCardItem = (items) =>
        items.map((item) => (
            <Col sm={12} md={6} lg={4} xl={3}>
                <Link to={item.name}>
                    <Card key={item._id} className="h-100">
                        <Card.Img src="https://i.imgur.com/sL6xy7H.jpg" />
                        <Card.ImgOverlay className="justify-content-center d-flex align-items-center">
                            <Card.Title style={{color: "#cccc00"}}>
                                {item.name}
                            </Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                </Link>
            </Col>
        ));

    return (
        <Container>
            <div className="explore-title">
                <h2>Shop</h2>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Explore</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <Row>
                    <Tabs
                        defaultActiveKey="brands"
                        className="mb-3"
                        fill
                        color="#000"
                    >
                        <Tab eventKey="brands" title="Brands">
                            <Row>
                                {brands.loading ? (
                                    <Loader />
                                ) : (
                                    setCardItem(brands.brands)
                                )}
                            </Row>
                        </Tab>
                        <Tab eventKey="categories" title="Categories">
                            <Row>
                                {categories.loading ? (
                                    <Loader />
                                ) : (
                                    setCardItem(categories.categories)
                                )}
                            </Row>
                        </Tab>
                    </Tabs>
                </Row>
            </div>
        </Container>
    );
};
export default ExploreScreen;
