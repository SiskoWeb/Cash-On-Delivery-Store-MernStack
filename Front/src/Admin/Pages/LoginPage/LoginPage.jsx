import React from 'react'
import styles from './LoginPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { LoginHook } from '../../HookAdmin/LoginHook'

// import { loginAction } from "../../../Redux/AuthSlices/ActionsAuth"
export default function LoginPage() {
    const [email, password, onChangeEmail, onChangePassowrd, onSubmit] = LoginHook()




    // const user = useSelector(state => state.auth.user)
    const isLoading = useSelector((state) => state.auth.isloading)



    // }
    console.log(isLoading)

    return (
        <div className={styles.Login}>
            <h1 >Login</h1>
            {isLoading ? <h2>Loading...</h2> : null}
            <form>
                <label>
                    Email:
                    <input required value={email} onChange={(e) => onChangeEmail(e)} type='email' placeholder='example@mail.com' />
                </label>
                <label>
                    Password:
                    <input required value={password} onChange={(e) => onChangePassowrd(e)} type='password' placeholder='*********' />
                </label>
                <input onClick={(e) => onSubmit(e)} type='submit' />
            </form>
            <ToastContainer />
        </div>
    )
}
