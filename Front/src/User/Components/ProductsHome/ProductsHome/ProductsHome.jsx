import { useSelector } from 'react-redux'
import ProductCard from '../../../../utilis/ProductCard/ProductCard'
import { ProductHook } from '../../../Hook/ProductHoo/ProductHook'
import styles from './ProductsHome.module.scss'
import { Link } from 'react-router-dom'

export default function ProductsHome() {

    const [isLoading, productsData] = ProductHook()


    const cart = useSelector((state) => state.cart.Cart)
    const displayedProducts = productsData.slice(0, 6);
    return (
        <div className={styles.products}>
            <div className={styles.title}>
                <p>New Arrival</p>
                <Link to='Products'>View All</Link>
            </div>
            <div className={styles.list}>

                {isLoading ? <h1>Loading</h1> : productsData.length >= 1 ? displayedProducts?.map((item) => {


                    const cartItem = cart?.filter(p => p.productID === item.id);

                    return (
                        <ProductCard key={item._id} data={item} cartItem={cartItem[0]} />
                    )


                })


                    : <h1>No Products</h1>}

            </div>
        </div>
    )
}