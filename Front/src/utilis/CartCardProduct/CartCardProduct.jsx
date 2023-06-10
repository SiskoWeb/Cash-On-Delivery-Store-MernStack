import React from 'react'
import styles from './CartCardProduct.module.scss'
import { CartHook } from '../../User/Hook/CartHook/CartHook'
import { AddProductToCartHook } from '../../User/Hook/ProductHoo/AddProductToCartHook'
export default function CartCardProduct({ product, item }) {
    const [onRemove, onDecrement, onincrement] = CartHook()


    return (
        <div className={styles.Item}>

            <div className={styles.imgProdctCart}>
                <img src={product?.imageCover}></img>
            </div>
            <div className={styles.textProductCart}>
                <p>{product?.title}</p>
                <button onClick={() => onRemove(product?._id)}>Remove</button>
            </div>
            <div className={styles.QuantityCart}>
                <i onClick={() => onDecrement(product?._id)} className="fa-solid fa-minus"></i>
                <span>{item.quantity}</span>
                <i onClick={() => onincrement(product?._id)} className="fa-solid fa-plus"></i>
            </div>
            <div className={styles.prictProductCart}>
                <p>${product?.price}</p>
            </div>
        </div>
    )
}
