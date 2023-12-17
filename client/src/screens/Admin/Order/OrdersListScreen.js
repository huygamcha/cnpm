import React, {useEffect} from "react";
import {Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {useNavigate} from "react-router-dom";
import {getAllOrders} from "../../../slices/orderListSlice";
import Meta from "../../../components/Meta";

function OrdersListScreen() {
    const dispatch = useDispatch();
    const {loading, orders, error} = useSelector((state) => state.orderList);

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllOrders());
        } else {
            navigate("/404");
        }
    }, [dispatch, navigate]);

    return (
        <>
            <Meta title="All Orders" />
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={"danger"}>{error}</Message>
            ) : (
                <Table striped bordered responsive>
                    <thead style={{textAlign: "center"}}>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td align="center">
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            class="fa-solid fa-circle-xmark"
                                            style={{color: "#D9544D"}}
                                        ></i>
                                    )}
                                </td>
                                <td align="center">
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            class="fa-solid fa-circle-xmark"
                                            style={{color: "#D9544D"}}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/order/${order._id}`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default OrdersListScreen;
