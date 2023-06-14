import React, { useState } from 'react'
import styles from './NavBarAdmin.module.scss'
import { useSelector } from 'react-redux'
import { NavBarHook } from '../../HookAdmin/NavBar/NavBarHook'
export default function NavBarAdmin() {



    const [onSubmit, onToggle, toggleFullscreen, isFullscreen] = NavBarHook()



    return (
        <nav className={styles.NavBarAdmin}>
            <div className={styles.btnToggle}>
                <button onClick={(e) => onToggle(e)}><i className="fa-solid fa-sliders"></i></button>
            </div>

            <div className={styles.AdminNavBar_profil}>
                <a href='/' target='_black'>Back To Website</a>
                <button className={styles.Fullscreen} onClick={() => toggleFullscreen()}>
                    <i class="fa-solid fa-expand"></i>
                </button>
                <button onClick={(e) => onSubmit(e)}>LogOut</button>
            </div>
        </nav>
    )
}
