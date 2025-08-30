import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/authStyle.css"
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    //FROM SUBMIT FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res.data.success) {
                toast.success("User Login successfully!")
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <Layout>
                <div className="form-container" style={{ minHeight: "90vh" }}>
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">Login Form</h4>

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
                                required
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
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={() => { navigate("/forgot-password") }}>
                                Forgot Password
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>

            </Layout>
        </>
    )
}

export default Login