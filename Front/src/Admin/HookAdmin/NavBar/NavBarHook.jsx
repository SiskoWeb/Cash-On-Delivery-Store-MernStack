import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { changeToggle } from "../../../Redux/NavBarSlice/NavBarSlice";


export const NavBarHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isFullscreen, setIsFullscreen] = useState(false);


    //send  data to action redux
    const onSubmit = async (e) => {
        e.preventDefault()

        setTimeout(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate('/login')
        }, 1100);




    }


    const onToggle = (e) => {
        e.preventDefault()
        dispatch(changeToggle())
    }




    const toggleFullscreen = () => {
        if (!isFullscreen) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
        setIsFullscreen(prev => !prev);
    };

    const enterFullscreen = () => {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };




    return [onSubmit, onToggle, toggleFullscreen, isFullscreen]
}