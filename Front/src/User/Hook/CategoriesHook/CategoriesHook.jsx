
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../../../Redux/CategoriesSlice/ActionsCategories'

export function CategoriesHook() {





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