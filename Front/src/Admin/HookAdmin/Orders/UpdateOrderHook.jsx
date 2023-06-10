import { useEffect, useState } from "react"
import notify from "../../../Hooks/useNotifaction"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../../Redux/productsSlice/ActionsProducts"

import { useParams } from "react-router-dom"
import { getOneOrderRedux, updateOrderRedux } from "../../../Redux/OrdersSlice/ActionsOrders"


export const UpdateOrderHook = () => {

    const params = useParams()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [ischecked, setIsChecked] = useState(null)
    const [id, setId] = useState(params.id)
    const [order, setOrder] = useState([])
    const [allproducts, setAllproducts] = useState([])






    //@desc get data for spicific product by params.id
    useEffect(() => {

        const getOneOrder = async () => {

            await dispatch(getOneOrderRedux(id))

        }
        getOneOrder()

    }, [])
    //@desc get data for spicific product by params.id
    useEffect(() => {

        const getProducts = async () => {


            await dispatch(getAllProducts())

        }
        getProducts()

    }, [])

    const productsList = useSelector((state) => state.products.productsList)
    const GetOneOrder = useSelector(state => state.orders.GetOneOrder)
    const isloading = useSelector(state => state.orders.isloading)



    //@desc after remove order list update
    useEffect(() => {

        if (GetOneOrder.status === 200) {

            if (productsList.status === 200) {

                if (GetOneOrder.data.data) {

                    setAllproducts(productsList.data.data)
                    setOrder(GetOneOrder.data.data)
                    setIsChecked(GetOneOrder.data.data?.isDelivered)


                }
            }







        }


        else {

            //     //@ if we get error
            if (GetOneOrder?.data) {

                if (GetOneOrder.data.message) {
                    setOrder([])
                }


            }



        }
    }, [GetOneOrder])



    const UpdateResponse = useSelector(state => state.orders.UpdateResponse)

    const handleChangeSwitcher = async (id) => {


        setLoading(true)
        //@desc fun create Category  passing ID + naem & image
        await dispatch(updateOrderRedux(id))

        //@dex switchh loading to false to active validator inside useEffect
        setLoading(false)



    }



    useEffect(() => {



        if (loading === false) {

            console.log(UpdateResponse)
            if (UpdateResponse.data.status === "success") {
                notify('category created', 'success')
                //@ if category created 
                dispatch(getOneOrderRedux(id))
                setOrder(GetOneOrder.data.data)

            }


            else {

                //     //@ if we get error
                if (UpdateResponse?.data) {

                    if (UpdateResponse.data.message) {
                        notify(" uncourrect", "error")
                        console.log("pb     ")

                    }


                }



            }
        }


    }, [loading])


    return [isloading, order, ischecked, handleChangeSwitcher, allproducts]
} 