import { useEffect, useState } from "react"
import notify from "../../../Hooks/useNotifaction"
import { addCategory, getAllCategories } from "../../../Redux/CategoriesSlice/ActionsCategories"
import { useDispatch, useSelector } from "react-redux"


export const AddCategoryHook = () => {

    const [categoryName, setCategoryName] = useState('')
    const [imgCategory, setImgCategory] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()


    const addCategoryResponse = useSelector((state) => state.categories.addCategoryResponse)



    const onChangeName = (e) => {
        setCategoryName(e.target.value)
    }

    const onChangeImg = (img) => {

        setImgCategory(URL.createObjectURL(img))
        setSelectedImg(img)
        console.log(selectedImg)
        console.log(img)
    }


    // @desc remove image tha user add 
    const clearInputImg = () => {
        setImgCategory(null)
        setSelectedImg(null)
    }


    // @desc upload data to Server 
    const onSubmit = async (e) => {

        e.preventDefault()
        if (imgCategory === null || selectedImg === null) {
            notify('image required ', 'error')
            return
        }

        if (categoryName === '') {
            notify('Name required ', 'error')
            return
        }
        if (categoryName.length <= 2) {
            notify('Name Category to short ', 'error')
            return
        }


        setLoading(true)
        // @desc create new form from buildin FromData
        const formData = new FormData()
        formData.append('name', categoryName)
        formData.append('image', selectedImg)
        console.log(formData)

        //@desc fun create Category  passing ID + naem & image
        await dispatch(addCategory(formData))

        //@dex switchh loading to false to active validator inside useEffect
        setLoading(false)

    }







    useEffect(() => {



        if (loading === false) {



            if (addCategoryResponse.status === 200) {
                //@ if category created 
                if (addCategoryResponse.data.data.createdAt) {
                    notify('category created', 'success')
                    dispatch(getAllCategories())

                    setImgCategory(null)
                    setSelectedImg(null)
                    setCategoryName('')
                }
            }
            else {

                //     //@ if we get error
                if (addCategoryResponse?.data) {
                    notify('main error ', 'error')
                    if (addCategoryResponse.data.errors) {
                        notify("email or passowrd uncourrect", "error")

                    }
                }



            }
        }


    }, [loading])


    return [categoryName, imgCategory, onChangeName, onChangeImg, onSubmit, clearInputImg]
} 