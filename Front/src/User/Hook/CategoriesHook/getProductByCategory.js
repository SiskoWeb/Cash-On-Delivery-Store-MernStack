import { useEffect, useState } from "react"
import { getAllProducts } from "../../../Redux/productsSlice/ActionsProducts"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export const GetProductByCategory = () => {
    const dispatch = useDispatch()
    const [productsFiltred, setProductsFiltred] = useState([])
    const cart = useSelector((state) => state.cart.Cart)
    const params = useParams()
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

                }

            }

        }
    }, [productsList])




    useEffect(() => {

        setProductsFiltred(productsData?.filter(p => p.category._id === params.id))


    }, [cart, productsData])

    return [isLoading, productsData,productsFiltred,cart]


} 