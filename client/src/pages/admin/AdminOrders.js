import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "delivered", "canceled"]);
    const [changedStatus, setChangedStatus] = useState("");
    const [auth] = useAuth();

    const formatOrderDateTime = (createdAt) => {
        try {
            const date = new Date(createdAt);

            const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            const day = date.getDate().toString().padStart(2, '0');
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12;
            const formattedHours12 = formattedHours ? formattedHours : 12;

            const formattedDateTime = `${day}-${month}-${year} at ${formattedHours12}:${minutes} ${ampm}`;
            return formattedDateTime;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllOrders = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-orders`, {
                headers: {
                    "Authorization": auth?.token,
                }
            })

            if (res?.data?.success) {
                setOrders(res?.data?.orders);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) {
            getAllOrders();
        }
    }, []);

    const handleChange = async (orderId, value) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/order-status/${orderId}`, { status: value }, {
                headers: {
                    "Authorization": auth?.token,
                }
            })

            if (res?.data?.success) {
                    getAllOrders();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <h4>All Ordersss</h4>

                            {orders?.map((item, index) => {
                                return (
                                    <div className="border shadow" key={item._id}>
                                        <table className="table table-hover table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Orders</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{index + 1}</td >
                                                    <td>
                                                        <Select onChange={(value, orderId) => handleChange(item?._id, value)} defaultValue={item?.status}>
                                                            {
                                                                status?.map((orderStatusItem, index) => (
                                                                    <Option key={index} value={orderStatusItem}>{orderStatusItem}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </td>

                                                    <td>{item?.buyer?.name}</td>
                                                    <td>{formatOrderDateTime(item?.createdAt)}</td>
                                                    <td>{item?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{item?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="container">
                                            {
                                                item?.products?.map((item) => (
                                                    <div className="row mb-2 p-3 card flex-row" key={item?._id}>
                                                        <div className="col-md-3">
                                                            <img
                                                                src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${item?._id}`}
                                                                className="card-img-top"
                                                                width="150px"
                                                                height="150px"
                                                                alt={item?.name}
                                                            />
                                                        </div>
                                                        <div className="col-md-9">
                                                            <p>{item?.name}</p>
                                                            <p>{item?.description.substring(0, 30)}</p>
                                                            <p>Price : {item?.price}</p>
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default AdminOrders