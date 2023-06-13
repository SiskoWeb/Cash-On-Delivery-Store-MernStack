import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartBodyPopup from '../../../utilis/CartBodyPoupup/CartBodyPopup.jsx'
export default function NavBar() {
    const [cartItems, setCartItems] = useState(1)
    const [isCart, setIsCart] = useState(true)

    const addToCart = () => {
        if (cartItems === 0) {
            setIsCart(false)

        }
        else {
            setIsCart(true)

        }


    }
    const cart = useSelector((state) => state.cart.Cart)

    return (
        <navbar >
            <div className={styles.navbar}>



                <div className={styles.logo}>

                    <Link to='/' ><img src={Logo}></img></Link>

                </div>



                <div className={styles.links}>

                    <Link to='/'>Home</Link>

                    <Link to='/Products'>Products</Link>


                </div>


                <div className={styles.cart}>
                    <div className={styles.cartMain}>
                        <Link to="/cart" >  {cart <= 1 ? null : <div className={styles.cartActive}>{cart?.length}

                        </div>}

                            <i className={`${styles.cartIcon}  fa-brands fa-opencart`} ></i></Link>

                        <div className={styles.popup}> <CartBodyPopup /></div>

                    </div>

                </div>


            </div>
        </navbar>
    )
}


// <div className={styles.inputClass}>
// <input type='text' placeholder='search for...'></input>
// <i className="fa-solid fa-magnifying-glass"></i>
// </div>