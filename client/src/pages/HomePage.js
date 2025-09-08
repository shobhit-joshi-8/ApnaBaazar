import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/context';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setchecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    //GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);

            if (res?.data?.success) {
                setProducts(res?.data?.products);
                setLoading(false);

            }
        } catch (error) {
            console.log(error);
            setLoading(true);

            toast.error("Something went wrong");
        }
    }

    const loadMore = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);

            if (res?.data?.success) {
                // setProducts([...products, ...res?.data?.products]);
                setProducts([...products, ...res?.data?.products]);

                setLoading(false);

            }
        } catch (error) {
            console.log(error);
            setLoading(true);

        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])

    //GET ALL CATEGORIES
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (res?.data?.success) {
                setCategories(res?.data?.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = (value, id) => {
        try {
            let all = [...checked];
            if (value) {
                all.push(id);
            }
            else {
                all = all.filter(c => c !== id)
            }
            setchecked(all);
        } catch (error) {
            console.log(error);
        }
    }

    const filterProduct = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`, { categories: checked, priceRange: radio });
            if (res?.data?.success) {
                setProducts(res?.data?.products);
                console.log(products, "filtered products")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
        getTotalCount();
    }, []);

    useEffect(() => {
        if (checked.length === 0 && radio.length === 0) {
            getAllProducts();
        } else {
            filterProduct();
        }
    }, [checked, radio]);

    const getTotalCount = async (req, res) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);

            if (res?.data?.success) {
                setTotal(res?.data?.total);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className="container-fulid">
                <div className="row mt-3">
                    <div className="col-md-2">
                        <div className="p-3">
                            {/* {console.log(checked, "checked")} */}
                            <h4 className="text-center">Filter By Category</h4>
                            <div className="d-flex flex-column">
                                {categories?.map((item) => (
                                    <Checkbox key={item?._id} onChange={(e) => handleFilter(e.target.checked, item?._id)}>
                                        {item?.name}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>


                        {/* price filter  */}
                        <div className="mt-4 p-3">
                            <h4 className="text-center">Filter By Price</h4>
                            <div className="d-flex flex-column">
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map((item) => (
                                        <div key={item?._id}>
                                            <Radio value={item?.array}>{item?.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>
                        </div>

                        <div className="p-3">
                            <button className="btn btn-danger" onClick={() => { window.location.reload() }}>Reset Filter</button>
                        </div>

                    </div>


                    <div className="col-md-9">
                        <h1 className="text-center">All products</h1>
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
                                        <button className="btn btn-secondary ms-1"
                                            onClick={(e) => {
                                                setCart([...cart, item]);
                                                toast.success("Item Added to cart")
                                                localStorage.setItem('cart', JSON.stringify([...cart, item]))
                                            }}>Add to cart</button>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 m-2">
                            {products && products?.length < total && (
                                <button className="btn btn-warning" onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                    {loading ? "Loading..." : "Load More"}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>



        </Layout>

    )
}

export default HomePage