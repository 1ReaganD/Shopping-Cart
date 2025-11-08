import { useEffect, useState } from "react";
import style from "./Shop.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamation, faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router";

function Shop(props) {
    const useCustomHook = () => {
        const [products, setProducts] = useState([]);
        const [error, setError] = useState();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                await fetch("https://fakestoreapi.com/products/")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Server Error")
                        }
                        return response.json();
                    })
                    .then((response) => setProducts(response))
                    .catch((error) => {
                        if (error.message === "Failed to fetch") {
                            setError("Network Error server not reachable")
                        } else {
                            setError(() => error.message)
                        }
                    })
                    .finally(() => setLoading(false))
            }
            fetchData();
        }, [])

        return { products, error, loading };
    }

        const { products, error, loading } = useCustomHook();

        if (error) return (
            <>
                <FontAwesomeIcon className={style.error} icon={faExclamation} bounce />
                <ErrorPage />
            </>
        )

        if (loading) return <FontAwesomeIcon className={style.loading} icon={faSpinner} spinPulse />

        const addProductToCart = (data) => {
            props.setProductDetail([...props.productDetail,  {...data, numberOfItems: 1}])
            props.setCounterProducts(() => props.counterProducts + 1)
        }

        return (
        <>
            <div className={style.juu}>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} className={style.cartIcon}/>
                </Link>
                <h1 className={style.header}>Welcome, Happy shopping</h1>
                <div className={style.pakuhesabia}>
                    <Link to="cart">
                        <FontAwesomeIcon icon={faCartShopping} className={style.cartIcon}/><span className={style.counter}>{props.counterProducts}</span>
                    </Link>
                </div>
            </div>
            <div className={style.products}>
                {products.map((product, index) => {
                    return (
                        <div className={style.productCard} key={index}>
                            <div className={style.rightSideOfProduct}>
                                <img src={product.image} />
                                <div className={style.belowImageProd}>
                                    <p>{product.rating.rate}</p>
                                    <p>{product.category}</p>
                                </div>
                            </div>
                            <div className={style.leftSideOfProduct}>
                                <h2>{product.title}</h2>
                                <p>${product.price}</p>
                                <p className={style.description}>{product.description}</p>
                                <div className={style.buttonProductCard}><button onClick={() => addProductToCart(product)}>Add to Chart</button></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Shop;