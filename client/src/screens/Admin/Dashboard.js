import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../slices/orderListSlice";
import { useNavigate } from "react-router-dom";
import { getUsersList } from "../../slices/usersSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.orderList);
  const { users, deleted } = useSelector((state) => state.users);
  console.log("««««« orders »»»»»", orders);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
      dispatch(getUsersList());
    } else {
      navigate("/404");
    }
  }, [dispatch, navigate]);

  let value = orders.reduce((total, order) => total + order.totalPrice, 0);

  const data = [
    { name: "Total users", value: users.length },
    { name: "Total orders", value: orders.length },
    { name: "Total amount sold", value },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div>Total users {users.length} </div>
      <div>Total orders {orders.length}</div>
      <div>Total amount sold{value}$</div>
    </div>
  );
};

export default Dashboard;
