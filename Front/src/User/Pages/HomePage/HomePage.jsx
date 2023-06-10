import React from 'react'
import styles from './HomePage.module.scss'
import NavBar from '../../Components/NavBar/NavBar'
import Hero from '../../Components/Hero/Hero'
import Categories from '../../Components/Categories/Categories'
import ProductsHome from '../../Components/ProductsHome/ProductsHome/ProductsHome'
import Footer from '../../../utilis/Footer/Footer'
export default function HomePage() {
    return (
        <div className={styles.home}>
<NavBar/>
            <Hero />
            <Categories />
            <ProductsHome />

        </div>
    )
}
