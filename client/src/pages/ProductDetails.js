import React, { useEffect, useState } from 'react'
import Layout from "../components/layout/Layout"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const params = useParams();
    const [similarProducts, setSimilarProducts] = useState([]);
    const navigate = useNavigate();
    //GET PRODUCT DETAILS
    const getProductDetails = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            if (res?.data?.success) {
                setProduct(res?.data?.product);
                console.log(product, "product")
                getSimilarProducts(res?.data?.product?._id, res?.data?.product?.category?._id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProductDetails();
            // getSimilarProducts();
        }
    }, [params.slug]);

    const getSimilarProducts = async (pid, cid) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-products/${pid}/${cid}`);

            if (res?.data?.success) {
                setSimilarProducts(res?.data?.products);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout >
            <h1>Product Details</h1>
            <div class="row container mt-2">
                <div class="col-md-6">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product?._id}`}
                        className="card-img-top"
                        alt={product.name}
                        width="300px"
                    />
                </div>
                <div class="col-md-6">
                    <div class="text-center">Product Details</div>
                    <h6>{product?.name}</h6>
                    <h6>{product?.description}</h6>
                    <h6>{product?.price}</h6>
                    <h6>{product?.category?.name}</h6>
                    <h6>{product?.shipping ? "Deliverable" : "Not deliverable"}</h6>
                    <button className="btn btn-secondary ms-1">Add to cart</button>


                </div>

            </div>
            <hr />
            <div className="row container">
                <h6 className="text-center">Similar Products</h6>
                {similarProducts.length < 1 && (<p>No Similar Product Found</p>)}
                <div class="d-flex flex-wrap">
                    <div className="d-flex flex-wrap">
                        {similarProducts?.map((item) => (
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
            </div>
        </Layout>
    )
}

export default ProductDetails