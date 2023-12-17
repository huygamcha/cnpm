import React, {useEffect} from "react";
import {Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {deleteUser, getUsersList} from "../../../slices/usersSlice";
import {useNavigate} from "react-router-dom";
import Meta from "../../../components/Meta";

function UsersListScreen() {
    const dispatch = useDispatch();
    const {loading, users, error, deleted} = useSelector(
        (state) => state.users
    );

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUsersList());
        } else {
            navigate("/404");
        }
    }, [dispatch, deleted, navigate]);

    function deleteHandler(id) {
        if (window.confirm("Do you want to delete this user?"))
            dispatch(deleteUser(id));
    }

    return (
        <>
            <Meta title="All Users" />
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={"danger"}>{error}</Message>
            ) : (
                <Table striped bordered responsive>
                    <thead style={{textAlign: "center"}}>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td align="center">
                                    {user.isAdmin ? (
                                        <i
                                            class="fa-solid fa-circle-check"
                                            style={{color: "green"}}
                                        ></i>
                                    ) : (
                                        <i
                                            class="fa-solid fa-circle-xmark"
                                            style={{color: "#D9544D"}}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button
                                        className="btn-sm"
                                        variant="danger"
                                        onClick={() => deleteHandler(user._id)}
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
}

export default UsersListScreen;
