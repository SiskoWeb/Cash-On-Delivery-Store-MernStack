import { useSelector } from 'react-redux'
import ProductCard from '../../../../utilis/ProductCard/ProductCard'
import { ProductHook } from '../../../Hook/ProductHoo/ProductHook'
import styles from './ProductsHome.module.scss'

export default function ProductsHome() {

    const [isLoading, productsData] = ProductHook()


    const cart = useSelector((state) => state.cart.Cart)

    return (
        <div className={styles.products}>
            <div className={styles.title}>
                <p>New Arrival</p>
                <button>View All</button>
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
    )
}