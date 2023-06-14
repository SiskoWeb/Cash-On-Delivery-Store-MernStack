




import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import notify from "../../../Hooks/useNotifaction"
import { AddOrder } from '../../../Redux/OrdersSlice/ActionsOrders'
import { ProductHook } from '../ProductHoo/ProductHook'
import { useNavigate } from 'react-router-dom'

export function AddOrderHook() {

    const navigate = useNavigate();
    const [isLoading, productsData] = ProductHook()



    const cart = useSelector((state) => state.cart.Cart)
    const OrderResponse = useSelector((state) => state.orders.addOrderResponse)
    const dispatch = useDispatch()

    const totalOrderPrice = cart?.reduce((total, cartItem) => {
        const item = productsData?.find((i) => i.id === cartItem.productID);
        return Math.floor(total + (item?.price || 0) * cartItem.quantity * 1)
    }, 0)




    const CreateOrder = async () => {


        const cartItems = JSON.parse(localStorage.getItem("shopping-cart"))
        const shippingAddress = JSON.parse(localStorage.getItem("address"))


        if (Object.keys(cartItems).length === 0) return notify('Cart Empty', 'warn')
        if (Object.keys(shippingAddress).length === 0) return notify('Add Shipping Address', 'warn')
        // if (cartItems.length < 1) return notify('no product in cart', 'warn')
        // if (shippingAddress.length < 1) return notify('add address first', 'warn')

        await dispatch(AddOrder({ cartItems, shippingAddress, totalOrderPrice }))


    }



    useEffect(() => {
        console.log(OrderResponse)
        if (OrderResponse.status === 'success') {


            if (OrderResponse.data.created_at) {


                notify('Order Created', 'success')
                setTimeout(() => {
                    navigate('/ThankYou')
                }, 1100);

                localStorage.removeItem("shopping-cart")

            }

        }


        else {

            //     //@ if we get error
            if (OrderResponse?.data) {
                if (OrderResponse.data.message) {
                    notify('there is error', 'error')
                }

            }

        }


    }, [OrderResponse])


    return [CreateOrder]
}

