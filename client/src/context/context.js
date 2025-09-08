import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItems = localStorage.getItem("cart");
        if (existingCartItems) {
            setCart(JSON.parse(existingCartItems));
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}


//CUSTOM HOOK

const useCart = () => useContext(CartContext);

export { useCart, CartProvider }