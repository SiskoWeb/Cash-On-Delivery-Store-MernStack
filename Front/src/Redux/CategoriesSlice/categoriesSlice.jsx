import { createSlice } from '@reduxjs/toolkit'

import { getAllCategories, addCategory, removeCategory, updateCategoryImage, getOneCategories } from './ActionsCategories'

const initialState = {
    categoriesList: [],
    addCategoryResponse: [],
    GetOneResponse: [],
    RemoveResponse: [],
    UpdateResponse: [],
    isloading: false

}


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getAllCategories.pending]: (state, action) => {
            state.isloading = true
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.categoriesList = action.payload
            state.isloading = false

        },
        [getAllCategories.rejected]: (state, action) => {
            state.isloading = true
        },
        [getOneCategories.pending]: (state, action) => {
            state.isloading = true
        },
        [getOneCategories.fulfilled]: (state, action) => {
            state.categoriesList = action.payload
            state.isloading = false

        },
        [getOneCategories.rejected]: (state, action) => {
            state.isloading = true
        },

        [addCategory.pending]: (state, action) => {
            // state.addCategoryResponse = action.payload

            state.isloading = true
        },
        [addCategory.fulfilled]: (state, action) => {
            state.addCategoryResponse = action.payload

            state.isloading = false

        },
        [addCategory.rejected]: (state, action) => {
            // state.addCategoryResponse = action.payload

            state.isloading = true
        }
        ,
        [removeCategory.pending]: (state, action) => {


            state.isloading = true
        },
        [removeCategory.fulfilled]: (state, action) => {
            state.RemoveResponse = action.payload
            state.isloading = false

        },
        [removeCategory.rejected]: (state, action) => {


            state.isloading = true
        },
        [updateCategoryImage.pending]: (state, action) => {


            state.isloading = true
        },
        [updateCategoryImage.fulfilled]: (state, action) => {
            state.UpdateResponse = action.payload
            state.isloading = false

        },
        [updateCategoryImage.rejected]: (state, action) => {


            state.isloading = true
        }


    }
})

// // Action creators are generated for each case reducer function
// export  { getAllCategories } = categoriesSlice.actions

export default categoriesSlice.reducer