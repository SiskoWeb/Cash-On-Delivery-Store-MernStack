import { createSlice } from "@reduxjs/toolkit";
import notify from "../../Hooks/useNotifaction"

const initialState = {
    isLoading: false,
    Cart: localStorage.getItem("shopping-cart")
        ? JSON.parse(localStorage.getItem("shopping-cart"))
        : [],
}

export const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {

            //1 check if this product alrady in cart
            const exist = state.Cart.find(item => item.productID === action.payload.productID);
            //2 if already in incress quantity +1
            if (exist) {
                state.Cart.map(item => {
                    if (item.productID === action.payload.productID) {
                        item.quantity = item.quantity + 1

                    }
                })
            }
            //3 if not in add it ro cart
            else {
                //1 add to cart
                state.Cart = [...state.Cart, action.payload]
            }
        },

        increment: (state, action) => {
            state.Cart.map(item => {
                if (item.productID === action.payload) {
                    item.quantity = item.quantity + 1
                    // notify('increment quantity', 'success')
                } else {
                    return state
                }
            })
        },

        decrement: (state, action) => {
            state.Cart.map(item => {
                if (item.productID === action.payload) {
                    if (item.quantity > 1) {

                        item.quantity = item.quantity - 1
                        // notify('decrement quantity', 'success')
                    }
                    else {
                        state.Cart = state.Cart.filter(item => item.productID !== action.payload)
                        // notify('Removed from cart', 'success')
                    }
                } else {

                    return state
                }
            })
        },
        removeFromCart: (state, action) => {
            state.Cart = state.Cart.filter(item => item.productID !== action.payload)
            notify('Removed ', 'success')
        },



    }
})
// Action creators are generated for each case reducer function
export const { AddToCart, decrement, removeFromCart, increment } = CartSlice.actions

export default CartSlice.reducer