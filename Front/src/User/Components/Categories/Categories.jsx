import CategoryCard from '../../../utilis/CategoryCard/CategoryCard'
import styles from './Category.module.scss'
import { CategoriesHook } from '../../Hook/CategoriesHook/CategoriesHook'

export default function Categories() {



    const [isloading, categoriesData] = CategoriesHook()





    return (

        <div className={styles.categories}>
            <p>Categories</p>
            <div className={styles.list}>
                {isloading ? <h1>Loading</h1> : categoriesData.length >= 1 ? categoriesData?.map((item, index) => <CategoryCard key={item._id} data={item} />) : <h1>No Categories</h1>}

            </div>
        </div>
    )
}