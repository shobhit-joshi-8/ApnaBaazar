import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([]);


    //GET ALL CATEGORIES
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (res?.data?.success) {
                setCategories(res?.data?.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return categories;
}