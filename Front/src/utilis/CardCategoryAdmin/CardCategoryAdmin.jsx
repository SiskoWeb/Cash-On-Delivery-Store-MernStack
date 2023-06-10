/* eslint-disable react/prop-types */

import styles from './CardCategoryAdmin.module.scss'
export default function CardCategoryAdmin({ onBringDataToUpdate, color, dataCategory, deleteCategory }) {

    return (



        <div className={styles.ProductCardAdmin}>

            <div className={styles.card1} >
                <img src={dataCategory.image}></img>
                <div className={`${styles.icons}`} >

                    <i onClick={() => deleteCategory(dataCategory._id)} className={`${styles.cartIcon}  fa-solid fa-trash-can`} ></i>
                    <i onClick={(e) => onBringDataToUpdate(dataCategory._id, dataCategory.image, dataCategory.name, e)} className="fa-solid fa-pen-to-square"></i>

                </div>
            </div>


            <div className={styles.card2}>




                <div className={styles.text} >

                    <h6>{dataCategory.name}</h6>


                </div>





            </div>


        </div>

    )
}




