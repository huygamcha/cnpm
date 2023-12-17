import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Meta from "../../../components/Meta";
import { createProduct } from "../../../slices/productSlice";
import { getAllCategories } from "../../../slices/categorySlice";
import { getAllBrands } from "../../../slices/brandSlice";

function CreateProductScreen() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.productsList
  );
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const navigate = useNavigate();
  // const {id} = useParams();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      //do something
      dispatch(getAllCategories());
      dispatch(getAllBrands());
    } else {
      navigate("/404");
    }
  }, []);

  function selectOptions(opts) {
    return opts.map((item) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ));
  }

  function submitHandler(e) {
    e.preventDefault();
    // if (imageUploaded)
    dispatch(
      createProduct({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      })
    );
  }

  async function uploadFileHandler(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setImageUploaded(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      console.log("««««« data »»»»»", data);
      setImage(data);
      setImageUploaded(false);
    } catch (error) {
      console.log(error);
      setImageUploaded(false);
    }
  }

  return (
    <>
      <Meta title="Add New Product" />
      <Link to={"/admin/products"} className="btn btn-light">
        <i class="fa-solid fa-arrow-left"></i> Go back to product
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
        {success && <Message variant={"success"}>Product Added</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Form.Group controlId="price" className="mb-3" as={Col} md="6">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="salegroup"
                as={Col}
                md="6"
              >
                <Form.Label>Sale Percentage</Form.Label>

                <InputGroup controlId="sale">
                  <Form.Control
                    placeholder="Enter sale percentage"
                    value={sale}
                    onChange={(e) => setSale(e.target.value)}
                  ></Form.Control>
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                placeholder="Select Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control type="file" onChange={uploadFileHandler} />
              <Form.Text muted>
                You can either choose image from computer or use an image URL.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select onChange={(e) => setBrand(e.target.value)}>
                <option value="">Choose a Brand</option>
                {selectOptions(brands)}
              </Form.Select>
              <Form.Text>
                Want to add a new brand?{" "}
                {<Link to="/admin/brands/create">Click Here!</Link>}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose a Cateogry</option>
                {selectOptions(categories)}
              </Form.Select>
              <Form.Text>
                Want to add a new category?{" "}
                {<Link to="/admin/categories/create">Click Here!</Link>}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="stock" className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                placeholder="Enter number of stocks"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sizes</Form.Label>
              <p>None</p>
            </Form.Group>
            <Button type="submit" className="my-3">
              Add
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default CreateProductScreen;
