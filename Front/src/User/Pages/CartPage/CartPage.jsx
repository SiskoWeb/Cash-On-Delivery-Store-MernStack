import React, { useState } from 'react'
import styles from './CartPage.module.scss'
import empty from '../../../assets/empty-cart.png'
import p11 from '../../../assets/Products/p11.png'
import p1 from '../../../assets/Products/p1.png'
import { ToastContainer } from 'react-toastify';
import { CartPageHook } from '../../Hook/CartPageHook.jsx'
import NavBar from '../../Components/NavBar/NavBar'
import { ProductHook } from '../../Hook/ProductHoo/ProductHook'
import { useSelector } from 'react-redux'
import { CartHook } from '../../Hook/CartHook/CartHook'
import CartCardProduct from '../../../utilis/CartCardProduct/CartCardProduct'
import { AddOrderHook } from '../../Hook/OrderHook/AddOrderHook'

export default function CartPage() {

    const [name, phone, city, address, onChangeName, onChangeNumber, onChangeCity, onChangeAddress, addAddress, editAddress, isAddressHere, shippingAddress] = CartPageHook()

    const [CreateOrder] = AddOrderHook()

    const [isLoading, productsData] = ProductHook()

    const cart = useSelector((state) => state.cart.Cart)

    // @desc sum total Price
    const totalPrice = cart?.reduce((total, cartItem) => {
        const item = productsData?.find((i) => i.id === cartItem.productID);
        return Math.floor(total + (item?.price || 0) * cartItem.quantity * 1)
    }, 0)


    return (
        <>
            <NavBar />
            <div className={styles.PageCart}>



                <div className={styles.cart}>

                    {/* -----Adress side -------*/}
                    <div className={styles.address}>
                        <h3>Shipping Detail</h3>
                        {isAddressHere ?
                            <>
                                <div className={styles.DisplayAddressContainer}>
                                    <div className={styles.DisplayAddress}>
                                        <p>Your Name<span>{shippingAddress.name}</span></p>
                                        <p>Phone Number <span>{shippingAddress.phone}</span></p>
                                        <p>City<span>{shippingAddress.city}</span></p>
                                        <p>Shipping Adress<span>{shippingAddress.address}</span></p>
                                    </div>
                                    <div className={styles.ChangeAddress}>
                                        <buuton onClick={(e) => editAddress(e)}>Change Address</buuton>
                                    </div>

                                </div>
                                <button onClick={() => CreateOrder()} className={styles.orderBtn}>Confirme</button>
                            </>
                            :





                            <> <p>Please fill out the form to complete the request</p>

                                <form>
                                    <label>
                                        Full Name:
                                        <input required type='text' value={name} onChange={(e) => onChangeName(e)} placeholder='yassine ...' name="name" />
                                    </label>

                                    <label>
                                        Phone Number:
                                        <input required value={phone} onChange={(e) => onChangeNumber(e)} type='number' placeholder='06*****' name="email" />
                                    </label>
                                    <label>
                                        City:
                                        <input required value={city} onChange={(e) => onChangeCity(e)} type='text' placeholder='name your city' name="city" />
                                    </label>
                                    <label className={styles.wrapper}>
                                        Address:
                                        <textarea required value={address} onChange={(e) => onChangeAddress(e)} className={styles.inputAddress} type='text' placeholder='add address here ' name="address" />
                                    </label>
                                    <input onClick={(e) => addAddress(e)} className={styles.addressBtn} type='submit' name="address" value='Add Address' />
                                </form>
                            </>}

                    </div>

                    {/* -----items side -------*/}
                    <div className={styles.items}>
                        <h3>ORDER DETAILS</h3>

                        <div className={styles.listItem}>


                            {cart?.length >= 1 ? cart?.map((item, index) => {
                                const product = productsData.find(p => p._id === item.productID)


                                return (
                                    <CartCardProduct product={product} item={item} key={index} />

                                )

                            }) : <><p>Cart Empty</p>
                                <img src={empty}></img></>}





                        </div>
                        <hr></hr>
                        <div className={styles.price}>
                            <div className={styles.textPrice}>
                                <p>Shipping:</p>
                                <p>Total:</p>
                            </div>
                            <div className={styles.numberPrice}>
                                <p>$0</p>
                                <p>${totalPrice}</p>
                            </div>
                        </div>


                    </div>




                </div>



                <ToastContainer />
            </div>
        </>
    )
}





