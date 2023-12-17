import {Link, useNavigate} from "react-router-dom";
import Meta from "../../../components/Meta";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../components/Loader";
import {addBrand} from "../../../slices/brandSlice";

const CreateBrandScreen = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, success, error} = useSelector((state) => state.brands);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(addBrand(name));
    };

    useEffect(() => {
        if (userInfo.isAdmin) {
            //show
        } else navigate("/404");
    }, [dispatch]);

    return (
        <>
            <Meta title="Add New Brand"></Meta>
            <Link to="/admin/brands" className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go back To Brand
            </Link>
            <FormContainer>
                <h1>Add new Brand</h1>
                {success && <Message variant={"success"}>Brand Added </Message>}
                {error && <Message variant={"dangerous"}></Message>}
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
export default CreateBrandScreen;
