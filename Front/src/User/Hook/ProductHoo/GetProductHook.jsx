import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { getOneProductRedux } from "../../../Redux/productsSlice/ActionsProducts"
import { useParams } from "react-router-dom"



export const GetProductHook = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const [id, setId] = useState(params.id)
    const [productsData, setProductsData] = useState([])






    //@desc get data for spicific product by params.id
    useEffect(() => {

        const getOneProduct = async () => {

            await dispatch(getOneProductRedux(id))
        }

        getOneProduct()

    }, [])

    const GetOneProduct = useSelector(state => state.products.GetOneProduct)
    const isloading = useSelector(state => state.products.isloading)
    //@desc after remove order list update
    useEffect(() => {

        if (GetOneProduct.status === 200) {


            if (GetOneProduct.data.data) {
                setProductsData(GetOneProduct.data.data)
            }

        }


        else {

            //     //@ if we get error
            if (GetOneProduct?.data) {
                if (GetOneProduct.data.message) {
                    setProductsData([])
                }

            }

        }
    }, [GetOneProduct])
    return [isloading, productsData]


} 