import React from 'react'
import styles from './ProductCardAdmin.module.scss'
import { Link } from 'react-router-dom'

// import img from '../../assets/Products/p1.png'

export default function ProductCardAdmin({ dataProduct, deleteProduct }) {



    return (

        <div className={styles.ProductCardAdmin}>

            <div className={styles.card1} >
                <img src={dataProduct.imageCover}></img>
                <div className={`${styles.icons}`} >

                    <i onClick={() => deleteProduct(dataProduct._id)} className={`${styles.cartIcon}  fa-solid fa-trash-can`} ></i>
                    <Link to={`${dataProduct._id}`}><i className={`${styles.updateIcon} fa-solid fa-pen-to-square `}></i></Link>

                </div>
            </div>


            <div className={styles.card2}>



                <h6>{dataProduct.title}</h6>
                <div className={styles.text} >



                    <p>${dataProduct.price}</p>
                    <p>-</p>

                    <p>Stock:{dataProduct.quantity}</p>
                </div>





            </div>


        </div>

    )
}
