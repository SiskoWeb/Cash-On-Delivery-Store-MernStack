import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { changeToggle } from "../../../Redux/NavBarSlice/NavBarSlice";


export const NavBarHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()


    //send  data to action redux
    const onSubmit = async (e) => {
        e.preventDefault()
        setTimeout(() => {
            navigate('/login')
        }, 1100);

        localStorage.removeItem("token")
        localStorage.removeItem("user")


    }


    const onToggle = (e) => {
        e.preventDefault()
        dispatch(changeToggle())
    }

    return [onSubmit, onToggle]
}