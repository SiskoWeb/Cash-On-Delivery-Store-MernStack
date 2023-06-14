import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { GetProductHook } from '../../Hook/ProductHoo/GetProductHook'
import ProductCard from '../../../utilis/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import styles from './/ProductsByCategory.module.scss'
import { useParams } from 'react-router-dom'
import { GetProductByCategory } from '../../Hook/CategoriesHook/GetProductByCategory'

export default function ProductsByCategory() {

    const [isLoading, productsData, productsFiltred, cart] = GetProductByCategory()

    return (

        <>
            <NavBar />
            <div className={styles.products}>

                <div className={styles.list}>

                    {isLoading ? <h1>Loading</h1> : productsData.length >= 1 ? productsFiltred?.map((item) => {


                        const cartItem = cart?.filter(p => p.productID === item.id);

                        return (
                            <ProductCard key={item._id} data={item} cartItem={cartItem[0]} />
                        )


                    })


                        : <h1>No Products</h1>}

                </div>
            </div>
        </>
    )
}
