import { useEffect, useState } from "react"
import notify from "../../../Hooks/useNotifaction"

import { useDispatch, useSelector } from "react-redux"
import { getAllProducts, removeProduct } from "../../../Redux/productsSlice/ActionsProducts"


export const RemoveProductHook = () => {




    const dispatch = useDispatch()




    const DeletedResponse = useSelector((state) => state.products.DeletedResponse)




    //@desc fun remove Category 
    const deleteProduct = (id) => {

        dispatch(removeProduct(id))




    }








    useEffect(() => {





        dispatch(getAllProducts())
        if (DeletedResponse.status === 202) {

            notify('removed', 'success')
            console.log('RMOVED')
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






    return [deleteProduct]
} 