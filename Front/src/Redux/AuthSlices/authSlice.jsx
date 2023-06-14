


import { createSlice } from '@reduxjs/toolkit'


import { loginAction } from './ActionsAuth'

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [],
    token: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : '',
    isloading: false

}


export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {

    },
    extraReducers: {
        [loginAction.pending]: (state, action) => {
            // state.user = action.payload
            state.isloading = true
        },
        [loginAction.fulfilled]: (state, action) => {
            state.user = action.payload

            state.isloading = false

        },
        [loginAction.rejected]: (state, action) => {
            // state.user = action.payload
            state.isloading = true
        }
    }
})

// // Action creators are generated for each case reducer function
// export  { getAllCategories } = categoriesSlice.actions

export default authSlice.reducer