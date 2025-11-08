import { useState } from "react";
import App from "./App";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import Shop from "./Shop";
import { createBrowserRouter, RouterProvider } from 'react-router'


function Routies() {
    const [counterProducts, setCounterProducts] = useState(0);
    const [productDetail, setProductDetail] = useState([]);
    
    const routes = [
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />
        },
        {
            path: "services",
            element: <Shop 
            counterProducts={counterProducts} 
            setCounterProducts={setCounterProducts}
            productDetail={productDetail} 
            setProductDetail={setProductDetail} />
        },
        {
            path: "services/cart",
            element: <Cart 
            counterProducts={counterProducts} 
            productDetail={productDetail}
            setProductDetail={setProductDetail} />
        }

    ];

    const route = createBrowserRouter(routes);

    return <RouterProvider router={route}/>
}

export default Routies;