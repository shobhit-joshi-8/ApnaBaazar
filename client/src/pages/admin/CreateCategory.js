import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';
import { useAuth } from '../../context/auth';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [auth] = useAuth();
    const [selected, setSelected] = useState();
    const [updatedName, setUpdatedName] = useState();


    //HANDLE FORM 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name }, {
                headers: {
                    "Authorization": auth?.token
                }
            })


            if (res?.data?.success) {
                toast.success("Category created successfully");
                getAllCategory();
                setName("");
            } else {
                toast.error(res?.data?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Error while creating the category")
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

    useEffect(() => {
        getAllCategory();
    }, [])

    //UPDATE CATEGORY
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName }, {
                headers: {
                    "Authorization": auth?.token,
                }
            });

            if (res.data.success) {
                toast.success("Category updated successfully!");
                setUpdatedName("");
                setSelected(null);
                setVisible(false);
                getAllCategory();
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
    }

    // DELETE CATEGORY
    const handleDelete = async (pid) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`, {
                headers: {
                    "Authorization": auth?.token,
                }
            });

            if (res.data.success) {
                toast.success("Category deleted successfully!");
                setSelected(null);
                getAllCategory();
            } else {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
    }

    return (
        <>
            <Layout>

                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3"><AdminMenu /></div>
                        <div className="col-md-9 ">
                            <h3>Manage Category</h3>

                            <div className="w-75">

                                <div className="py-3">
                                    <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                                </div>

                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item?.name}</td>
                                                <td>
                                                    <button className="btn btn-primary ms-2" onClick={() => { setVisible(true); setUpdatedName(item?.name); setSelected(item) }}>Edit</button>
                                                    <button className="btn btn-danger ms-2" onClick={() => { handleDelete(item._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                        <Modal
                            onCancel={() => { setVisible(false) }}
                            open={visible}
                            footer={null}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateCategory