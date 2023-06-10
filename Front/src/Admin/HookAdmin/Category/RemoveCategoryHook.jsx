import { useEffect } from "react"
import notify from "../../../Hooks/useNotifaction"
import { getAllCategories, removeCategory } from "../../../Redux/CategoriesSlice/ActionsCategories"
import { useDispatch, useSelector } from "react-redux"


export const RemoveCategoryHook = () => {




    const dispatch = useDispatch()

    const RemoveResponse = useSelector((state) => state.categories.RemoveResponse)






    //@desc fun remove Category 
    const deleteCategory = (id) => {

        dispatch(removeCategory(id))



    }





    useEffect(() => {



        if (RemoveResponse.status === 202) {
            //@ if category created 
            dispatch(getAllCategories())
            notify('removed', 'success')

        }
        else {

            //     //@ if we get error
            if (RemoveResponse?.data) {
                notify('main error ', 'error')

                if (RemoveResponse.data.message) {
                    notify("the is no category belong this id", "error")

                }
            }



        }

    }, [RemoveResponse])






    return [deleteCategory]
} 