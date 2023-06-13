import React from 'react'
import styles from './Hero.module.scss'
import heroImg from '../../../assets/hero3.png'
import p from '../../../assets/2-1.png'
export default function Hero() {


    return (
        <div className={styles.hero}>

            <div className={styles.col1}>
                <h4 >Poupler product</h4>
                <h1>Hot Product This Week</h1>

                <button>DISCOVER NOW <i className="fa-solid fa-arrow-right"></i></button>
            </div>

            <div className={styles.col2}>
                <img src={p}></img>
            </div>
        </div>
    )
}
