import React from 'react'
import styles from './OrderDetail.module.scss'
import pro1 from '../../../assets//Products/p1.png'


import Switch from "react-switch";

import { UpdateOrderHook } from '../../HookAdmin/Orders/UpdateOrderHook'
import Loading from '../../../utilis/Loading/Loading';
import { ToastContainer } from 'react-toastify';
export default function OrderDetail() {

    const [isloading, order, ischecked, handleChangeSwitcher, allproducts] = UpdateOrderHook()

    return (
        <div>
            {isloading ? <Loading /> : null}
            <div className={styles.OrderDetail}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}><h5>Order ID<span>#4</span> </h5>{order?.isDelivered ? <p className={styles.shipped}>shipped</p> : <p className={styles.pending}>Pending</p>}</div>


                    <div className={styles.ListProduct}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Images</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Total</th>



                                </tr>

                            </thead>
                            <tbody>

                                {order === [] ? <p>no porudcts</p> :
                                    order?.cartItems?.map((item, index) => {
                                        const product = allproducts.find(p => p.id === item.productID);

                                        return (
                                            <tr key={index}>

                                                <td><img src={product?.imageCover}></img></td>
                                                <td>{product?.title}</td>
                                                <td>${product?.price}x{item.quantity}</td>
                                                <td>${product?.price * item.quantity}</td>

                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.TotalPrice}>
                        <p>Total:</p>
                        <p>${order?.totalOrderPrice}</p>

                    </div>
                </div>


                <div className={styles.card}>
                    <div className={styles.cardHeader}><h5>ORDER STATUS:</h5></div>
                    <div className={styles.optionsStatus}>
                        <p>isDelivered:</p>
                        <label htmlFor="icon-switch">

                            <Switch
                                checked={ischecked}
                                onChange={() => handleChangeSwitcher(order?._id)}
                                uncheckedIcon={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",

                                            height: "100%",
                                            fontSize: 15,
                                            color: "orange",
                                            paddingRight: 1
                                        }}
                                    >


                                    </div>
                                }
                                checkedIcon={
                                    <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 475 512.24"><path fill="#C28F60" d="m0 417.58 202.44 26.17c-5.92-16.29-9.15-33.86-9.15-52.19 0-42.22 17.12-80.46 44.79-108.13 27.66-27.66 65.9-44.78 108.12-44.78s80.46 17.12 108.13 44.78a154.91 154.91 0 0 1 16.02 18.85l1.39-261.39L171.87 0 0 77.98v339.6z" /><path fill="#AA7950" d="m471.74 40.89-11.97 7.8-120.8 75.36L0 77.98 171.87 0z" /><path fill="#D2A06D" d="M340.21 238.76V126l131.53-85.11L475 309.1c-5.96-9.29-12.9-17.89-20.67-25.67-27.67-27.66-65.91-44.78-108.13-44.78-2 0-4 .04-5.99.11z" /><path fill="#65472F" d="m232.12 8.21 98.23 13.4-140.6 84.02-.09 145.42-50.03-34.08-50.04 28.28 6.25-152.68z" /><path fill="#3AAF3C" d="M346.2 270.87c66.66 0 120.69 54.03 120.69 120.69 0 66.65-54.03 120.68-120.69 120.68-66.65 0-120.68-54.03-120.68-120.68 0-66.66 54.03-120.69 120.68-120.69z" /><path fill="#0DA10D" fillRule="nonzero" d="M409.98 338.39h9.06c-38.6 42.87-68.52 78.21-95.31 129.89-13.95-29.82-26.39-50.41-54.2-69.5l10.38-2.34c20.79 17 31.74 35.9 43.82 61.73 24.65-47.57 51.97-81.29 86.25-119.78z" /><path fill="#fff" fillRule="nonzero" d="M300.02 381.78c9.27 5.34 15.31 9.78 22.49 17.7 18.64-30 38.87-46.62 65.17-70.21l2.57-.99h28.79c-38.6 42.86-68.52 78.21-95.31 129.89-13.95-29.82-26.39-50.41-54.2-69.5l30.49-6.89z" /></svg>
                                }
                                className="react-switch"
                                id="icon-switch"
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}><h5>Shipping Address:</h5></div>
                    <div className={styles.itemShipping}>
                        <div className={styles.item}><i className="fa-solid fa-user"></i> <h5>{order ? order?.shippingAddress?.name : "no Name"}</h5></div>
                        <div className={styles.item}><i className="fa-solid fa-phone"></i> <h5>{order?.shippingAddress?.phone}</h5></div>
                        <div className={styles.item}><i className="fa-solid fa-city"></i><h5>{order?.shippingAddress?.city}</h5></div>
                        <div className={styles.item}><i className="fa-solid fa-location-dot"></i> <h5>{order?.shippingAddress?.address}</h5></div>

                    </div>
                </div>


                <ToastContainer
                    autoClose={600} />
            </div>
        </div>
    )
}
