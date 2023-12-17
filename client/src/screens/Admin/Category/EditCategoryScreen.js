import {Link} from "react-router-dom";
import Meta from "../../../components/Meta";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import {Button, Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../components/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {updateCategory} from "../../../slices/categorySlice";

const EditCategoryScreen = () => {
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, updated, error} = useSelector((state) => state.categories);
    const {id} = useParams();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo.isAdmin) {
            //show
        } else navigate("/404");
    }, [dispatch, updated, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({id, name}));
    };

    return (
        <>
            <Meta title="Edit Category" />
            <Link to="/admin/brands" className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go Back To Categories
            </Link>
            <FormContainer>
                <h1>Edit Category</h1>
                {updated && (
                    <Message variant="success">Category Updated</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-3">
                            Save
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};
export default EditCategoryScreen;
