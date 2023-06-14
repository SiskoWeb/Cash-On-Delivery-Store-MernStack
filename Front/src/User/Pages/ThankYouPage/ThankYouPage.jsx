import React from 'react'
import styles from './ThankYouPage.module.scss'
import NavBar from '../../Components/NavBar/NavBar'
export default function ThankYouPage() {


    const dataUser = localStorage.getItem("address")
        ? JSON.parse(localStorage.getItem("address"))
        : [];
    console.log(dataUser)

    return (

        <>
            <NavBar />

            <div className={styles.thankYouPage}>

                <div className={styles.thanksIcon}><i class="fa-solid fa-check"></i></div>

                <h2>Thank You <span >{dataUser?.name}</span></h2>

                <p>Your request has been registered.<br></br>
                    We will contact you within 24 hours to confirm your request. Thanks !!!</p>

                <button>Continue Shopping</button>
            </div>
        </>
    )
}
