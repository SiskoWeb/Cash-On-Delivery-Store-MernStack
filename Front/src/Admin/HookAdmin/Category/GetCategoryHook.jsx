import { useEffect, useState } from "react"

import { getAllCategories } from "../../../Redux/CategoriesSlice/ActionsCategories"
import { useDispatch, useSelector } from "react-redux"


export const GetCategoryHook = () => {
    const dispatch = useDispatch()
    const [categoriesData, setCategoriesData] = useState([])





    const isloading = useSelector((state) => state.categories.isloading)
    const Categories = useSelector((state) => state.categories.categoriesList)

    useEffect(() => {

        dispatch(getAllCategories())

    }, [dispatch])



    //@desc after remove order list update
    useEffect(() => {
        console.log(Categories)
        if (Categories.status === 200) {


            if (Categories.data.data) {
                setCategoriesData(Categories.data.data)
            }

        }


        else {

            //     //@ if we get error
            if (Categories?.data) {

                if (Categories.data.message) {
                    setCategoriesData([])
                }


            }



        }
    }, [Categories])

    return [isloading, categoriesData]
} 