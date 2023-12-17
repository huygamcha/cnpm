import {Button, Col, Row, Table} from "react-bootstrap";
import Message from "../../../components/Message";
import Meta from "../../../components/Meta";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {deleteBrand, getAllBrands} from "../../../slices/brandSlice";
import Loader from "../../../components/Loader";

const BrandListScreen = () => {
    const dispatch = useDispatch();

    const {loading, error, brands, deleted} = useSelector(
        (state) => state.brands
    );
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.isAdmin) {
            dispatch(getAllBrands());
        } else navigate("/404");
    }, [dispatch, navigate, deleted]);

    const onDeleteHandler = (id) => {
        dispatch(deleteBrand(id));
    };

    return (
        <>
            <Meta title="All Brands" />
            <Row className="align-items-center">
                <Col>
                    <h1>Brands</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to="/admin/brands/create">
                        <Button className="my-3" variant="dark" type="button">
                            Add New Brand
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">Error</Message>
            ) : (
                <Table striped bordered responsive>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand._id}>
                                <td>{brand._id}</td>
                                <td>{brand.name}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/brands/${brand._id}`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="btn-sm"
                                        variant="danger"
                                        onClick={() =>
                                            onDeleteHandler(brand._id)
                                        }
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};
export default BrandListScreen;
