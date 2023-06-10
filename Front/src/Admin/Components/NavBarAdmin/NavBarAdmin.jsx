import React, { useState } from 'react'
import styles from './NavBarAdmin.module.scss'
import { useSelector } from 'react-redux'
import { NavBarHook } from '../../HookAdmin/NavBar/NavBarHook'
export default function NavBarAdmin() {



    const [onSubmit, onToggle] = NavBarHook()



    return (
        <nav className={styles.NavBarAdmin}>
            <div className={styles.btnToggle}>
                <button onClick={(e) => onToggle(e)}><i className="fa-solid fa-sliders"></i></button>
            </div>

            <div className={styles.AdminNavBar_profil}>


                <button onClick={(e) => onSubmit(e)}>LogOut</button>
            </div>
        </nav>
    )
}
