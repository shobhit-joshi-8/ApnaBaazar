import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useAuth } from '../../context/auth';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    const [auth] = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    //GET SINGLE PRODUCT
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setName(res?.data?.product?.name);
            setDescription(res?.data?.product?.description);
            setPrice(res?.data?.product?.price);
            setQuantity(res?.data?.product?.quantity);
            setShipping(res?.data?.product?.shipping);
            setCategory(res?.data?.product?.category?._id);
            setId(res?.data?.product?._id);

        } catch (error) {
            console.log(error);
        }
    }

    //GET ALL CATEGORIES
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (res?.data?.success) {
                setCategories(res?.data?.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while getting categories");
        }
    };

    //CREATE PRODUCT FUNCTION
    const handleUpdateProduct = async (e) => {
        try {
            e.preventDefault();
            const productData = new FormData()
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("shipping", shipping);
            productData.append("category", category);


            // console.log(productData, "formdata")
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData, {
                headers: {
                    "Authorization": auth?.token
                }
            });

            if (res?.data?.success) {
                toast.success("Product Updated successfuly");
                navigate("/dashboard/admin/products");

            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    //DELETE PRODUCT
    const handleDeleteProduct = async () => {
        try {
            let answer = window.prompt("Are you sure want to delete this product");
            if(!answer) {
                return;
            }
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`, {
                headers: {
                    "Authorization": auth?.token,
                }
            });

            if(res?.data?.success){
                toast.success("Product Deleted successfully");
                navigate("/dashboard/admin/products");
            }
            else{
                toast.error("Error while deliting product");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    useEffect(() => {
        getSingleProduct();
    }, []);
    return (
        <>
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3"><AdminMenu /></div>
                        <div className="col-md-9">
                            <h1>Update Product</h1>
                            <div className="m-1 w-75">
                                <Select variant="outlined" placeholder="Select Category" size="large" showSearch
                                    // className="form-select mb-3"
                                    value={category}
                                    className="mb-3"
                                    style={{ width: "100%" }}
                                    onChange={(value) => { setCategory(value) }}>
                                    {categories?.map((item) => (
                                        <Option key={item?._id} value={item?._id}>{item?.name}</Option>
                                    ))}
                                </Select>

                                <div className="mb-3">
                                    <label className="btn btn-outline-secondary col-md-3">
                                        {photo ? photo?.name : "Upload photo "}
                                        <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {photo ? (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className="img img-responsive" />
                                        </div>
                                    ) : <div className="text-center">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${id}`} alt="product_photo" height={"200px"} className="img img-responsive" />
                                    </div>}
                                </div>

                                <div className="mb-3">
                                    <input type="text" value={name} placeholder="Write product name" className="form-control" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <textarea type="text" value={description} placeholder="Decription" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={price} placeholder="Price" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={quantity} placeholder="Quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <Select variant="outlined" placeholder="Select Shipping" size="large"
                                        // className="form-select mb-3"
                                        value={shipping ? "Yes" : "No"}
                                        style={{ width: "100%" }}
                                        onChange={(value) => { setShipping(value) }}>
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>

                                <div className="mb-3">
                                    <div className="btn btn-primary" onClick={handleUpdateProduct}>Update Product</div>
                                </div>

                                <div className="mb-3">
                                    <div className="btn btn-danger" onClick={handleDeleteProduct}>Delete Product</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default UpdateProduct