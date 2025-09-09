import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/context'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
// import DropIn from "braintree-web-drop-in-react";
import dropin from "braintree-web-drop-in";
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPages = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dropinContainer = useRef();

    //REMOVE PRODUCT
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error)
        }
    }

    //TOTAL PRICE
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => { total += item?.price });
            return total;
        } catch (error) {
            console.log(error);
        }
    }

    //PAYMENT GATEWAY TOKEN
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (clientToken && dropinContainer.current) {
            dropin.create({
                authorization: clientToken,
                // paypal: {
                //     flow: "vault",
                // },
                container: dropinContainer.current,
            }, (err, dropinInstance) => {
                if (err) console.error(err);
                else setInstance(dropinInstance);
            });
        }
    }, [clientToken]);

    //HANDLE PAYMENT 
    // const handlePayment = () => { }

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
            }, {
                headers: {
                    Authorization: auth?.token
                }
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 0 ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : " Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        {
                            cart?.map((item) => (
                                <div className="row mb-2 p-3 card flex-row" key={item?._id}>
                                    <div className="col-md-3">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${item?._id}`}
                                            className="card-img-top"
                                            width="150px"
                                            height="150px"
                                            alt={item?.name}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <p>{item?.name}</p>
                                        <p>{item?.description.substring(0, 30)}</p>
                                        <p>Price : {item?.price}</p>
                                        <button className="btn btn-danger" onClick={() => removeCartItem(item?._id)}>Remove</button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} ₹</h4>

                        {auth?.user?.address ?
                            (<>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                </div>
                            </>) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    ) : (
                                        <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart" })}>Please Login to checkout</button>
                                    )}
                                </div>
                            )}

                        <div className="mt-2">
                            {!clientToken || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    {/* <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    /> */}
                                    <div ref={dropinContainer}></div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPages