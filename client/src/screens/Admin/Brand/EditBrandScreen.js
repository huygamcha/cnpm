import { Link, useNavigate, useParams } from "react-router-dom";
import Meta from "../../../components/Meta";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBrand, getProductsBrand } from "../../../slices/brandSlice";
import Loader from "../../../components/Loader";

const EditBrandScreen = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, updated, error } = useSelector((state) => state.brands);
  const { id } = useParams();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo.isAdmin) {
      //show
      dispatch(getProductsBrand(id));
    } else navigate("/404");
  }, [updated, dispatch, navigate, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateBrand({ id, name }));
  };
  console.log("««««« name »»»»»", name);
  return (
    <>
      <Meta title="Edit Brand" />
      <Link to="/admin/brands" className="btn btn-light">
        <i class="fa-solid fa-arrow-left"></i> Go Back To Brands
      </Link>
      <FormContainer>
        <h1>Edit Brand</h1>
        {loading && <Loader />}
        {updated && <Message variant="success">Brand Updated</Message>}
        {error && <Message variant="danger">{error}</Message>}
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
      </FormContainer>
    </>
  );
};
export default EditBrandScreen;
