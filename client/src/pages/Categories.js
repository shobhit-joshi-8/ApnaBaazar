import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        {categories?.map((item) => (
                            <Link to={`/category/${item?.slug}`} key={item._id} className="btn btn-primary m-3">{item?.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Categories