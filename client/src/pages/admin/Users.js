import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const Users = () => {
    return (
        <>
            <Layout>
                <div class="container-fluid m-3 p-3">
                    <div class="row">
                        <div class="col-md-3"><AdminMenu /></div>
                        <div class="col-md-9">All users</div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Users