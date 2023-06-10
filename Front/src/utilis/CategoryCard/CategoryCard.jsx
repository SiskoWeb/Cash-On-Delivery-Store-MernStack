import styles from './CategoryCard.module.scss'

export default function CategoryCard({ data }) {




    return (
        <div className={styles.cardCategory}>
            <div className={styles.card} >



                <img src={data?.image}></img>


            </div>

            <p>{data?.name}</p>
        </div>


    )
}