import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-allProducts`);

            if (res?.data?.success) {
                setProducts(res?.data.allProducts);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <>
            <Layout>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className="col-md-9">
                        <h1 className="text-center">
                            All Products List
                        </h1>

                        <div className="d-flex flex-wrap">
                            {products.map((item) => (
                                <Link to={`/dashboard/admin/products/${item.slug}`} key={item?._id} className="product-link">
                                    <div className="card m-2" style={{ width: '18rem' }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${item._id}`} className="card-img-top" alt={item.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item?.description}</p>
                                        </div>
                                    </div>
                                </Link>

                            ))}

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Products