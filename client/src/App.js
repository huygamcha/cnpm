import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/Product/ProductScreen";
import CartScreen from "./screens/Cart/CartScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import SignupScreen from "./screens/SignUp/SignupScreen";
import UserScreen from "./screens/Profile/UserScreen";
import ShippingScreen from "./screens/Checkout/ShippingScreen";
import PaymentScreen from "./screens/Checkout/PaymentScreen";
import PlaceOrderScreen from "./screens/Checkout/PlaceOrderScreen";
import OrderScreen from "./screens/Order/OrderScreen";
import UsersListScreen from "./screens/Admin/User/UsersListScreen";
import EditUserScreen from "./screens/Admin/User/EditUserScreen";
import ProductListScreen from "./screens/Admin/Product/ProductListScreen";
import CreateProductScreen from "./screens/Admin/Product/CreateProductScreen";
import EditProductScreen from "./screens/Admin/Product/EditProductScreen";
import OrdersListScreen from "./screens/Admin/Order/OrdersListScreen";
import OrderUpdateScreen from "./screens/Admin/Order/OrderUpdate";
import ErrorScreen from "./screens/ErrorScreen";
import CreateBrandScreen from "./screens/Admin/Brand/CreateBrandScreen";
import BrandListScreen from "./screens/Admin/Brand/BrandListScreen";
import EditBrandScreen from "./screens/Admin/Brand/EditBrandScreen";
import CreateCategoryScreen from "./screens/Admin/Category/CreateCategoryScreen";
import CategoryListScreen from "./screens/Admin/Category/CategoryListScreen";
import EditCategoryScreen from "./screens/Admin/Category/EditCategoryScreen";
import AllProudctScreen from "./screens/Explore/AllProductsScreen";
import SaleScreen from "./screens/Explore/SaleScreen";
import BrandScreen from "./screens/Explore/BrandScreen";
import CategoryScreen from "./screens/Explore/CategoryScreen";
import ExploreScreen from "./screens/Explore/ExploreScreen";
import Dashboard from "./screens/Admin/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/:pageNumber"
              element={<HomeScreen />}
            />

            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile/:id" element={<UserScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/all" element={<AllProudctScreen />} />
            <Route path="/sale" element={<SaleScreen />} />
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/brand/:id" element={<BrandScreen />} />
            <Route path="/category/:id" element={<CategoryScreen />} />

            {/***************  Admin Routes ***************/}
            {/**** Users */}
            <Route
              path="/admin/dashboard"
              element={<Dashboard></Dashboard>}
            ></Route>
            <Route path="/admin/users" element={<UsersListScreen />} />
            <Route path="/admin/user/:id" element={<EditUserScreen />} />

            {/**** Products */}
            <Route path="/admin/products" element={<ProductListScreen />} />
            <Route
              path="/admin/products/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route
              path="/admin/product/create"
              element={<CreateProductScreen />}
            />
            <Route path="/admin/product/:id" element={<EditProductScreen />} />
            <Route path="/admin/orders" element={<OrdersListScreen />} />
            <Route path="/admin/order/:id" element={<OrderUpdateScreen />} />

            {/**** Brand */}
            <Route
              path="/admin/brands/create"
              element={<CreateBrandScreen />}
            />
            <Route path="/admin/brands" element={<BrandListScreen />} />
            <Route path="/admin/brands/:id" element={<EditBrandScreen />} />

            {/**** Cateogry */}
            <Route
              path="/admin/categories/create"
              element={<CreateCategoryScreen />}
            />
            <Route path="/admin/categories" element={<CategoryListScreen />} />
            <Route
              path="/admin/categories/:id"
              element={<EditCategoryScreen />}
            />

            {/**** Error route */}
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
