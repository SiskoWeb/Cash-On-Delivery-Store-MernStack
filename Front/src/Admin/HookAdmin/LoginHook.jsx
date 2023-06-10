import { useEffect, useState } from "react"
import notify from "../../Hooks/useNotifaction"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginAction } from "../../Redux/AuthSlices/ActionsAuth";

export const LoginHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, sePassword] = useState()
    const [loading, setLoading] = useState(true)



    const res = useSelector(state => state.auth.user)

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }


    const onChangePassowrd = (e) => {
        sePassword(e.target.value)
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }


    //send  data to action redux
    const onSubmit = async (e) => {
        e.preventDefault()
        if (email === '') {
            notify('email required ', 'error')
            return
        }

        if (!isValidEmail(email)) {
            notify('add email ', 'error')
            return
        }
        if (password === '') {
            notify('passowrd required ', 'error')
            return
        }
        if (password.length <= 4) {
            notify('passowrd Short ', 'error')
            return
        }

        setLoading(true)
        // @desc action redux to login
        await dispatch(loginAction({
            email,
            password
        }))

        //@dex switchh loading to false to active validator inside useEffect
        setLoading(false)


    }

    useEffect(() => {

        if (loading === false) {
            if (res) {

                //@ check if login succesful by response  came from server
                console.log(res)


                //@ if login succesful
                if (res.token) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("user", JSON.stringify(res.data))
                    notify("Accoun Created Successfuly", "success")
                    setTimeout(() => {
                        navigate('/admin')
                    }, 1100);
                }


                //@ if we get error
                else {

                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    if (res.data.message === "email or passowrd uncourrect") {
                        notify("email or passowrd uncourrect", "error")
                    }
                    if (res.data.errors) {

                        if (res?.errors[0].msg) {
                            notify("email or passowrd uncourrect", "error")
                        }
                    }

                }




                setLoading(true)
            }
        }
    }, [loading])


    return [email, password, onChangeEmail, onChangePassowrd, onSubmit]
}