import { useEffect, useState } from "react"
import notify from "../../../Hooks/useNotifaction"

import { useDispatch, useSelector } from "react-redux"
// import { getAllProducts } from "../../../Redux/productsSlice/ActionsProducts"
import { getAllOrdersRedux, removeOrderRedux } from "../../../Redux/OrdersSlice/ActionsOrders"


export const RemoveOrderHook = () => {




    const dispatch = useDispatch()




    const DeletedResponse = useSelector((state) => state.orders.DeletedResponse)




    //@desc fun remove Category 
    const deleteOrder = (id) => {

        dispatch(removeOrderRedux(id))


    }








    useEffect(() => {






        if (DeletedResponse.status === 202) {
            dispatch(getAllOrdersRedux())
            notify('removed', 'success')

        }
        else {

            //     //@ if we get error
            if (DeletedResponse?.data) {
                notify('main error ', 'error')

                if (DeletedResponse.data.message) {
                    notify("the is no category belong this id", "error")

                }
            }



        }

    }, [DeletedResponse])






    return [deleteOrder]
} 