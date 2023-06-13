import { Link } from 'react-router-dom'
import styles from './CategoryCard.module.scss'

export default function CategoryCard({ data }) {




    return (
        <Link to={`Categories/${data?._id}`} className={styles.cardCategory}>
            <div className={styles.card} >



                <img src={data?.image}></img>


            </div>

            <p>{data?.name}</p>
        </Link>


    )
}