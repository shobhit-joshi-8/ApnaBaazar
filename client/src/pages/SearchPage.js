import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/layout/Layout';

const SearchPage = () => {
    const [values, setvalues] = useSearch();
    return (
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results?.length < 1 ? "No Product Found" : `Found ${values?.results?.length}`}</h6>

                    <div className="d-flex flex-wrap mt-">
                        {values.results?.map((item) => (
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

                                    <button className="btn btn-primary ms-1">View Product</button>
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

export default SearchPage