import React from 'react'
import styles from './CartBodyPopup.module.scss'

import p11 from '../../assets/Products/p11.png'
import p1 from '../../assets/Products/p1.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProductHook } from '../../User/Hook/ProductHoo/ProductHook'
import CartCardProduct from '../CartCardProduct/CartCardProduct'
export default function CartBodyPopup() {


    const [isLoading, productsData] = ProductHook()
    const cart = useSelector((state) => state.cart.Cart)


    // @desc sum total Price
    const totalPrice = cart?.reduce((total, cartItem) => {
        const item = productsData?.find((i) => i.id === cartItem.productID);
        return Math.floor(total + (item?.price || 0) * cartItem.quantity * 1)
    }, 0)

    return (
        <div className={styles.Card}>

            {!cart?.length >= 1 ? <p>No products in the cart.</p> :

                <div className={styles.CardBody}>




                    <div className={styles.listItem}>

                        {cart?.length >= 1 ? cart.map((item, index) => {
                            const product = productsData.find(p => p._id === item.productID)

                            return (

                                <CartCardProduct product={product} item={item} key={index} />

                            )

                        }) : null}

                    </div>


                    <hr></hr>
                    <div className={styles.price}>
                        <p>Total:</p>
                        <p>${totalPrice}</p>
                    </div>

                    <Link className={styles.ViewCart} to='/cart'>View cart</Link>




                </div>}
        </div>
    )
}
