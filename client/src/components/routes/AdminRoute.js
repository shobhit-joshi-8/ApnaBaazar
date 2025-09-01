import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`, {
                    headers: {
                        "Authorization": auth?.token
                    }
                })

                if (res.data.ok) {
                    setOk(true);
                }
                else {
                    setOk(false);
                }
            } catch (error) {
                toast.error("Something Went wrong")
            }

        }

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
}