import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { fetchProductById } from "../../../slices/productSlice";
import { updateProduct } from "../../../slices/productSlice";
import Meta from "../../../components/Meta";
import { getAllBrands } from "../../../slices/brandSlice";
import { getAllCategories } from "../../../slices/categorySlice";

function EditProductScreen() {
  const dispatch = useDispatch();
  const { product, loading, error, updated } = useSelector(
    (state) => state.productsList
  );

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const navigate = useNavigate();
  const { id } = useParams();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [sale, setSale] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [brandInfo, setBrandInfo] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!product.name || product._id !== id) {
        dispatch(fetchProductById(id));
        dispatch(getAllBrands());
        dispatch(getAllCategories());

        setBrand(value1?.name);
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      }
    } else {
      navigate("/");
    }
  }, [dispatch, product, updated]);

  function submitHandler(e) {
    e.preventDefault();
    if (window.confirm("Do you want to update this product?"))
      dispatch(
        updateProduct({
          id,
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

  function selectOptions(opts) {
    return opts.map((item) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ));
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

      setImage(data);
      setImageUploaded(false);
    } catch (error) {
      console.log(error);
      setImageUploaded(false);
    }
  }
  const value1 = brands.find((brandIndex) => brandIndex._id === brand);
  if (value1?.name) setBrand(value1?.name);

  const value2 = categories.find(
    (categoryIndex) => categoryIndex._id === category
  );
  if (value2?.name) setCategory(value2?.name);
  return (
    <>
      <Meta title="Edit Product" />
      <Link to={"/admin/products"} className="btn btn-light my-3">
        <i class="fa-solid fa-arrow-left"></i> Go Back To Products
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updated && <Message variant={"success"}>Product Updated</Message>}
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
              <Form.Group controlId="price" className="mb-3" as={Col}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
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
                <option defaultValue={brand} value="">
                  {brand}
                </option>
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
                <option defaultValue={category} value="">
                  {category}
                </option>
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
                rows={4}
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Sizes</Form.Label>
              <p>None</p>
            </Form.Group> */}
            <Button type="submit" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default EditProductScreen;
