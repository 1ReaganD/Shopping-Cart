import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Cart.module.css"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useEffect, useState } from "react";

function Cart(props) {
    const [checker, setChecker] = useState(null);
    const [isItINcOrDec, setIsItINcOrDec] = useState();
    const [number, setNumber] = useState(0);
    const [selectedValue, setSelectedValue] = useState("");
    const [inputNumber, setInputNumber] = useState(0);

    const increment = (buyProduct) => {
        setIsItINcOrDec("increment");
        setChecker(buyProduct);
        setNumber(x => x + 1)
    }

    const decrement = (buyProduct) => {
        setChecker(buyProduct);
        setIsItINcOrDec("decrement");
        setNumber(x => x - 1)
    }

    const remove = (buyProduct) => {
        setIsItINcOrDec("remove");
        setNumber(x => x + 1)
        setChecker(buyProduct);
    }

    const handleInputNumberChange = (event, buyProduct) => {
        setChecker(buyProduct);
        setInputNumber(event.target.value);
        setNumber(x => x + 1);
        setIsItINcOrDec("handleInputNumberChange");
    }


    useEffect(() => {
        console.log(inputNumber);
        if (checker === null) return;
        
        if (isItINcOrDec == "increment" || isItINcOrDec == "decrement") {
            if (isItINcOrDec === "increment") {

            var newNumberOfItems = checker.numberOfItems + 1;
            
        }
        

        if (isItINcOrDec === "decrement") {
            if (checker.numberOfItems > 1) { 
                var newNumberOfItems = checker.numberOfItems - 1; 
            }else{
            var newNumberOfItems = checker.numberOfItems; 
        }
        }

        props.setProductDetail((allPrd) =>
            allPrd.map((prod) =>
                (prod.id === checker.id) ? {
                    ...prod, total: prod.price * newNumberOfItems, numberOfItems: newNumberOfItems
                } : prod));
        }else if (isItINcOrDec === "handleInputNumberChange") {
            props.setProductDetail((allPrd) =>
            allPrd.map((prod) =>
                (prod.id === checker.id) ? {
                    ...prod, total: prod.price * inputNumber, numberOfItems: inputNumber
                } : prod));
        }
        else{
            props.setProductDetail((allPrd) => allPrd.filter((prod) => (prod.id != checker.id)  ))
        }
    }, [number])

    const handleChange = (event) => {
        setSelectedValue(Number(event.target.value));
    }

    return (
        <div className={style.cart}>
            <h1>Your Cart</h1>
            <div className={style.cartHolder}>
                <div className={style.right}>
                    <div className={style.header}>
                        <h2>Shopping Cart</h2>
                        <h2>{props.productDetail.length} Items</h2>
                    </div>
                    <div className={style.productTitles}>
                        <p>Product Details</p>
                        <p>Quality</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    {props.productDetail.map((buyProduct) => {
                        return (
                            <div className={style.toBeBought} key={buyProduct.id}>
                                <div className={style.productDetails}>
                                    <div className={style.productSpecifications}>
                                        <img src={buyProduct.image} />
                                        <div className={style.productSpecificationsInfo}>
                                            <p>{buyProduct.title}</p>
                                            <p>{buyProduct.category}</p>
                                            <button onClick={() => remove(buyProduct)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.quantity}>
                                    <div className={style.importantInfoOuter}>
                                        <div className={style.importantInfo}>
                                            <p onClick={() => decrement(buyProduct)} id="decrement">-</p>
                                        <div className={style.smallNoBox}>{(!buyProduct.numberOfItems)
                                            ? 1 : buyProduct.numberOfItems}</div>
                                        <p onClick={() => increment(buyProduct)} id="increment">+</p>
                                        </div>
                                        <div className={style.importantInfo2}>
                                            <input type="number" onChange={(event) => handleInputNumberChange(event, buyProduct)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.price}>
                                    <p>$ {buyProduct.price}</p>
                                </div>
                                <div className={style.total}>
                                    <p>$ {(!buyProduct.total) ? buyProduct.price : buyProduct.total}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={style.left}>
                    <div className={style.headerLeft}>
                        <h2>Order Summary</h2>
                    </div>
                    <div className={style.totalItems}>
                        <p>ITEMS</p>
                        <p>$ { 
                        props.productDetail.map((priceOfEach) => 
                            (priceOfEach.total) ? priceOfEach.total : priceOfEach.price)
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                            }
                        </p>
                    </div>
                    <div className={style.shipping}>
                        <p>SHIPPING</p>
                        <select value={selectedValue} onChange={handleChange}>
                            <option >Delivery method</option>
                            <option value={5.00}>Standard Delivey - $ 5.00</option>
                            <option value="10.00">Express Delivery - $ 10.00</option>
                        </select>
                    </div>
                    <div className={style.totalPrice}>
                        <p>TOTAL COST</p>
                        <p>$ { 
                        props.productDetail.map((priceOfEach) => 
                            (priceOfEach.total) ? priceOfEach.total : priceOfEach.price)
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) + selectedValue
                            }</p>
                        <button className={style.payButton}>CHECKOUT</button>
                    </div>
                </div>
            </div>
            <Link to="/services"><FontAwesomeIcon icon={faArrowLeft} className={style.backArrow} />Continue Shopping</Link>
        </div>
    )
}

export default Cart;