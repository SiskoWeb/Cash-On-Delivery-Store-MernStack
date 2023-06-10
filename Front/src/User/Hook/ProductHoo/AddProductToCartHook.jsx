import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, increment } from '../../../Redux/CartSlice/CartSlice'
import { useEffect } from 'react'
import notify from "../../../Hooks/useNotifaction"

export function AddProductToCartHook() {



    const AddToCartFunc = async (id) => {
        //@desc Create object for cart
        const cartItem = {
            productID: id,
            quantity: 1
        }
        await dispatch(AddToCart(cartItem))
        notify('Product Added', 'success')
    }



    const cart = useSelector((state) => state.cart.Cart)
    const dispatch = useDispatch()


    return [AddToCartFunc, increment]
}