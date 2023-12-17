import {Link, useNavigate} from "react-router-dom";
import Meta from "../../../components/Meta";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../../slices/categorySlice";
import Loader from "../../../components/Loader";

const CreateCategoryScreen = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error, success} = useSelector((state) => state.categories);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo.token) {
            //show
        } else navigate("/404");
    }, [dispatch, navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(addCategory(name));
    };
    return (
        <>
            <Meta title="Add New Cateogry"></Meta>
            <Link to="/admin/categories" className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go back To Categories
            </Link>
            <FormContainer>
                <h1>Add new Category</h1>
                {success && (
                    <Message variant={"success"}>Category Added </Message>
                )}
                {error && <Message variant={"danger"}>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter brand name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                        Add
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};
export default CreateCategoryScreen;
