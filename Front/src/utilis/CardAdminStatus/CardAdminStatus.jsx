import React from 'react'
import styles from './CardAdminStatus.module.scss'


export default function CardAdminStatus({ color, text, icon, number }) {
    return (
        <div className={styles.cardAdmin} style={{ background: color }}>


            <div> {icon}</div>


            <div>
                <p>{text}</p>
                <p>{number}</p>


            </div>


        </div>
    )
}
