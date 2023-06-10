import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Dashboard from '../../Components/Dashboard/Dashboard'
import styles from './DashboardPage.module.scss'
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';
import { useSelector } from 'react-redux';
export default function DashboardPage() {


    const toggle = useSelector(state => state.navBar.toggle)
    return (
        <div className={toggle ? styles.adminPage : styles.hideSideBar}>

            {/*Side Bar*/}
            <div className={styles.PartSideBar}>
                <SideBar />
            </div>

            {/*Dashboard Components Bar*/}
            <div >
                <NavBarAdmin />
                <div className={styles.contentAdmin}>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
