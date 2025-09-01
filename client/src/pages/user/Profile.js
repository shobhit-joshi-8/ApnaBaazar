import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Profile = () => {
  return (
    <>
        <Layout>
            <div class="container-fluid m-3 p-3">
                    <div class="row">
                        <div class="col-md-3"><UserMenu /></div>
                        <div class="col-md-9">Profile</div>

                    </div>
                </div>
        </Layout>
    </>
  )
}

export default Profile