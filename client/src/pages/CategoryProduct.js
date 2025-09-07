import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const getProductByCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params?.slug}`);

            if (res?.data?.success) {
                setProducts(res?.data?.products);
                setCategory(res?.data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params.slug) {
            getProductByCategory();
        }
    }, [params?.slug])

    return (
        <Layout >
            <div class="container mt-3">
                <h1 className="text-center">Category - {category?.name}</h1>
                <h1 className="text-center">{products?.length} result found</h1>


                <div className="d-flex flex-wrap">
                    {products?.map((item) => (
                        <div className="card m-2" style={{ width: '18rem' }} key={item?._id}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${item._id}`}
                                className="card-img-top"
                                alt={item.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item?.description?.substring(0, 30)}....</p>
                                <p className="card-text">{item?.price}₹</p>
                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/products-details/${item.slug}`)}>View Product</button>
                                <button className="btn btn-secondary ms-1">Add to cart</button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    )
}

export default CategoryProduct