import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../../Redux/productsSlice/ActionsProducts"


export const GetProductHook = () => {
    const dispatch = useDispatch()

    const [productsData, setProductsData] = useState([])

    const productsList = useSelector((state) => state.products.productsList)
    const isLoading = useSelector((state) => state.products.isloading)





    useEffect(() => {

        dispatch(getAllProducts())

    }, [dispatch])

    //@desc after remove order list update
    useEffect(() => {

        if (productsList.status === 200) {


            if (productsList.data.data) {
                setProductsData(productsList.data.data)
            }

        }


        else {

            //     //@ if we get error
            if (productsList?.data) {
                if (productsList.data.message) {
                    setProductsData([])
                }

            }

        }
    }, [productsList])
    return [isLoading, productsData]


} 