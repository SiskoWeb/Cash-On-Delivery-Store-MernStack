import React from 'react'
import styles from './Hero.module.scss'
import heroImg from '../../../assets/hero3.png'
export default function Hero() {


    return (
        <div className={styles.hero}>
            <img src={heroImg}></img>
        </div>
    )
}
