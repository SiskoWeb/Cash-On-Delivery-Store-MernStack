
import { useSelector } from 'react-redux'

import styles from './ProductsHome.module.scss'
import { ProductHook } from '../../Hook/ProductHoo/ProductHook'
import ProductCard from '../../../utilis/ProductCard/ProductCard'
import NavBar from '../../Components/NavBar/NavBar'
import FilterBar from '../../Components/FilterBar/FilterBar'

export default function AllProductsUser() {

    const [isLoading, productsData] = ProductHook()


    const cart = useSelector((state) => state.cart.Cart)

    return (

        <>
            <NavBar />
            <div className={styles.products}>
                <FilterBar />
                <div className={styles.title}>
                    <p></p>
                    <button></button>
                </div>
                <div className={styles.list}>

                    {isLoading ? <h1>Loading</h1> : productsData.length >= 1 ? productsData?.map((item) => {


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