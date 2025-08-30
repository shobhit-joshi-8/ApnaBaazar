import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/authStyle.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //FROM SUBMIT FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer });
            if (res.data.success) {
                toast.success("Password Reset Successfull")
                navigate('/login');
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
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Reset Passowrd</h4>

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
                        {/* <label htmlFor="exampleInputAnswer" className="form-label">
                            Address
                        </label> */}
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder="What is your Favourite Sport"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputNewPassword" className="form-label">
                            Password
                        </label> */}
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputNewPassword"
                            placeholder="Enter New password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword