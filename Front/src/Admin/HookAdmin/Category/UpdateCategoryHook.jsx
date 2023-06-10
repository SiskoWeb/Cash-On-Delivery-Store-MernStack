import { useEffect, useState } from "react"
import notify from "../../../Hooks/useNotifaction"
import { getAllCategories, updateCategoryImage } from "../../../Redux/CategoriesSlice/ActionsCategories"
import { useDispatch, useSelector } from "react-redux"




export const UpdateCategoryHook = () => {
    const [id, setId] = useState('')

    const [nameUpdate, setNameUpdate] = useState('yassine')
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [imgToDisplay, setImgToDisplay] = useState(null);
    const [imgToUpload, setImgToUpload] = useState(null);

    const dispatch = useDispatch()


    const res = useSelector((state) => state.categories.UpdateResponse)


    //@desc func desined for get image from input user
    const saveFileUpdate = (img) => {
        setImgToDisplay(URL.createObjectURL(img))
        setImgToUpload(img);
        console.log(imgToUpload)


    };



    //@desc func update Category  passing ID + naem or image
    const onBringDataToUpdate = (id, image, name, e) => {
        e.preventDefault()

        setImgToDisplay(image)

        setNameUpdate(name)
        setId(id)
        setToggleUpdate(true)






    }


    //@desc func update Category  passing ID + naem or image
    const onSubmitUpdate = async (e) => {
        e.preventDefault()
        if (imgToDisplay === null) {
            notify('image required ', 'error')
            return
        }

        if (nameUpdate === '') {
            notify('Name required ', 'error')
            return
        }

        if (id === '') {
            notify('invalid id ', 'error')
            return
        }

        // @desc create new form from buildin FromData
        const formData = new FormData()


        //@desc check if user change img if yes add it into form if not updae only name
        if (imgToUpload === null) {
            formData.append("name", nameUpdate);


        }

        else {

            formData.append("name", nameUpdate);
            formData.append("image", imgToUpload);
        }

        setLoading(true)
        await dispatch(updateCategoryImage({ id, formData }))
        setLoading(false)

    }



    useEffect(() => {


        if (loading === false) {

            if (res.status === 201) {
                notify('Category Updated ', 'success')
                dispatch(getAllCategories())
                setToggleUpdate(false)

            }
            else {
                if (res?.data) {
                    if (res?.data.message?.includes('duplicat')) {
                        notify("this name already added", "error")
                    }
                    if (res.data.errors) {
                        notify("Invalid category id format", "error")

                    }
                }
            }


        }





    }, [loading])


    return [onBringDataToUpdate, onSubmitUpdate, imgToDisplay, nameUpdate, setNameUpdate, saveFileUpdate, toggleUpdate, setToggleUpdate]
} 