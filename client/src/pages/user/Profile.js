import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setAddress(address);
        setEmail(email);

    }, [])


    //FROM SUBMIT FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address }, {
                headers: {
                    "Authorization": auth?.token,
                }
            });

            if (res?.data?.success) {
                setAuth({ ...auth, user: res?.data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = res?.data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated successfully!");
            }
            else {
                toast.error("Something went Wrong");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <Layout>
                <div class="container-fluid m-3 p-3">
                    <div class="row">
                        <div class="col-md-3"><UserMenu /></div>
                        <div class="col-md-9">
                            <div className="form-container" style={{ minHeight: "90vh" }}>
                                <form onSubmit={handleSubmit}>
                                    <h4 className="title">User Profile</h4>
                                    <div className="mb-3">
                                        {/* <label htmlFor="exampleInputName" className="form-label">
                            Name
                        </label> */}
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            id="exampleInputName"
                                            placeholder="Enter Your Name"

                                        />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label> */}
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Email"

                                            disabled

                                        />
                                    </div>

                                    <div className="mb-3">
                                        {/* <label htmlFor="exampleInputPhone" className="form-label">
                            Phone
                        </label> */}
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPhone"
                                            placeholder="Enter Your Phone"

                                        />
                                    </div>

                                    <div className="mb-3">
                                        {/* <label htmlFor="exampleInputAddress" className="form-label">
                            Address
                        </label> */}
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="form-control"
                                            id="exampleInputAddress"
                                            placeholder="Enter Your Address"

                                        />
                                    </div>


                                    <div className="mb-3">
                                        {/* <label htmlFor="exampleInputPassword" className="form-label">
                                            Password
                                        </label> */}
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPassword"
                                            placeholder="Enter password"

                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Profile