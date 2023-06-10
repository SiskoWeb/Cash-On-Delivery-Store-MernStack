import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './SideBar.module.scss'
import logo from '../../../assets/admin/logo.png'
import avatar from '../../../assets/admin/admin_avatar.png'
import { useSelector } from 'react-redux'
export default function SideBar() {

    const user = useSelector(state => state.auth.user)

    const ActiveLink = ({ isActive }) => (isActive ? styles.active : 'inactive')
    return (
        <aside className={styles.SideBar}>
            <div className={styles.logoAdmin}><h1>Logo</h1></div>
            <div className={styles.SideBarcol2}>
                <img src={avatar}></img>
                <h6>{user?.name}</h6>
                <p>{user?.role}</p>
            </div>

            <ul className={styles.Links}>


                <li>     <NavLink end className={ActiveLink} to="/admin"><i className="fa-solid fa-gauge" ></i><span>Dashboard</span><i className="fa fa-angle-right pull-right"></i></NavLink> </li>
                <li >    <NavLink className={ActiveLink} to="allproducts"><i className="fa-brands fa-product-hunt"></i><span>Products</span><i className="fa fa-angle-right pull-right"></i></NavLink></li>
                <li >    <NavLink className={ActiveLink} to="addproduct"><i className="fa-solid fa-water"></i><span>Add Product</span><i className="fa fa-angle-right pull-right"></i></NavLink></li>
                <li >    <NavLink className={ActiveLink} to="categories"><i className="fa-solid fa-water"></i><span>Categories</span><i className="fa fa-angle-right pull-right"></i></NavLink></li>



            </ul>


        </aside >
    )
}
