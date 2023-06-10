




import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, removeFromCart, decrement, increment } from '../../../Redux/CartSlice/CartSlice'
import { useEffect } from 'react'
import notify from "../../../Hooks/useNotifaction"
import { AddOrder } from '../../../Redux/OrdersSlice/ActionsOrders'

export function CartHook() {





    const cart = useSelector((state) => state.cart.Cart)
    const dispatch = useDispatch()




    const onRemove = async (id) => {
        await dispatch(removeFromCart(id))
    }


    const onincrement = async (id) => {
        await dispatch(increment(id))
    }



    const onDecrement = async (id) => {

        await dispatch(decrement(id))
    }





    //update localstorage and add cart information to it
    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(cart));
    }, [onDecrement, onRemove, onincrement]);



    return [onRemove, onDecrement, onincrement]
}

