import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/authStyle.css"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //FROM SUBMIT FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res.data.success) {
                toast.success("User registered successfully!")
                navigate('/login');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }


    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Register Form</h4>
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
                            required
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
                            required
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
                            required
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

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>

        </Layout>
    )
}

export default Register