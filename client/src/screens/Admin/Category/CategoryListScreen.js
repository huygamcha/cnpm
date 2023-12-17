import {Button, Col, Row, Table} from "react-bootstrap";
import Message from "../../../components/Message";
import Meta from "../../../components/Meta";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {deleteCategory, getAllCategories} from "../../../slices/categorySlice";
import Loader from "../../../components/Loader";

const CategoryListScreen = () => {
    const dispatch = useDispatch();

    const {loading, error, categories, deleted} = useSelector(
        (state) => state.categories
    );
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.isAdmin) {
            dispatch(getAllCategories());
        } else navigate("/404");
    }, [dispatch, navigate, deleted]);

    const onDeleteHandler = (id) => {
        dispatch(deleteCategory(id));
    };

    return (
        <>
            <Meta title="All Categories" />
            <Row className="align-items-center">
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to="/admin/categories/create">
                        <Button className="my-3" variant="dark" type="button">
                            Add New Categories
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered responsive>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr id={category._id}>
                                <td>{category._id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/categories/${category._id}`}
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
                                            onDeleteHandler(category._id)
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
export default CategoryListScreen;
