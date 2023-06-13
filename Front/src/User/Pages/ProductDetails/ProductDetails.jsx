import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'

import NavBar from '../../Components/NavBar/NavBar'
import { GetProductHook } from '../../Hook/ProductHoo/GetProductHook'
import Loading from '../../../utilis/Loading/Loading'
import { AddProductToCartHook } from '../../Hook/ProductHoo/AddProductToCartHook'
import { CartHook } from '../../Hook/CartHook/CartHook'
import { useSelector } from 'react-redux'
export default function ProductDetails() {

    const [imageIndex, setImageIndex] = useState(0)
    const [itemCart, setItemCart] = useState([])



    const [isloading, productsData] = GetProductHook()
    const [AddToCartFunc] = AddProductToCartHook()

    const [onRemove, onDecrement, onincrement] = CartHook()

    const cart = useSelector((state) => state.cart.Cart)


    //@desc filter cart and get only cart of our product
    useEffect(() => {

        setItemCart(cart.filter(p => p.productID === productsData._id))

    }, [cart, productsData])

    return (

        <div>

            <NavBar />

            {isloading ? <Loading /> : null}
            <div className={styles.PageProdcut}>
                <div className={styles.ProductDetails}>
                    <div className={styles.ProductImages} >
                        {/*     <div className={styles.ListImgs}>
                            {productsData.images?.map((item, index) => {
                                return (<img key={index} className={styles.minImages} src={item} onClick={() => setImageIndex(index)}></img>)
                            })}
                        </div> */}
                        <img className={styles.MainImgs} src={productsData.imageCover}></img>
                    </div>

                    <div className={styles.Text} >
                        <h1>{productsData?.title}</h1>


                        <div className={styles.Price}>
                            <h3>${productsData?.price}</h3>

                            <p>Short Hooded Coat features a straight body, large pockets with b,
                                a straight body, large pockets with buttoutton </p>


                            <div className={styles.btns}>
                                {itemCart.length >= 1 ?
                                    <div className={styles.QuantityCart}>
                                        <i onClick={() => onDecrement(productsData?._id)} className="fa-solid fa-minus"></i>
                                        <span>{itemCart[0]?.quantity}</span>
                                        <i onClick={() => onincrement(productsData?._id)} className="fa-solid fa-plus"></i>
                                    </div>


                                    : <button onClick={() => AddToCartFunc(productsData?.id)} className={styles.addToCart}>
                                        Add To Cart  <i className="fa-brands fa-opencart"></i></button>




                                }

                                <div className={styles.wishlist_icon}>   <i className="far fa-heart"></i></div>
                            </div>
                        </div>
                    </div>


                </div >

                <div className={styles.Description}>
                    <div>  <p>Description</p></div>
                    <hr></hr>


                    <div dangerouslySetInnerHTML={{ __html: productsData?.description }}></div>


                </div>


            </div>
        </div>
    )
}
