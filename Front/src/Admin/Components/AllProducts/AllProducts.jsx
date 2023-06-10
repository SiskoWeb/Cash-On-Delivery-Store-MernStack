
import styles from './AllProducts.module.scss'
import { ToastContainer } from 'react-toastify';


import ProductCardAdmin from '../../../utilis/ProductCardAdmin/ProductCardAdmin'
import { RemoveProductHook, } from '../../HookAdmin/Product/RemoveProductHook'
import { GetProductHook } from '../../HookAdmin/Product/GetProductHook'
import Loading from '../../../utilis/Loading/Loading';




export default function AllProducts() {

    const [isLoading, productsData] = GetProductHook()
    const [deleteProduct] = RemoveProductHook()
    GetProductHook()






    return (
        <div className={styles.AllProducts}>

            <h4>All Products</h4>
            <div className={styles.list}>

                {isLoading ? <h1>Loading...</h1> : productsData?.length >= 1 ? productsData?.map((item) => <ProductCardAdmin key={item._id} dataProduct={item} img={item.imageCover} price={item.price} name={item.title} deleteProduct={deleteProduct} />) : <h1>No Product</h1>}

            </div>
            <ToastContainer />
            {isLoading ? <Loading /> : null}
        </div>
    )
}
