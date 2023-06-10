import { createSlice } from '@reduxjs/toolkit'

import { getAllOrdersRedux, AddOrder, removeOrderRedux, updateOrderRedux, getOneOrderRedux } from './ActionsOrders'

const initialState = {
    OrderList: [],

    isloading: false,
    addOrderResponse: [],
    DeletedResponse: [],
    UpdateResponse: [],
    GetOneOrder: [],
}


export const OrdersSlice = createSlice({
    name: 'Orders',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getAllOrdersRedux.pending]: (state, action) => {
            state.isloading = true
        },
        [getAllOrdersRedux.fulfilled]: (state, action) => {
            state.OrderList = action.payload
            state.isloading = false

        },
        [getAllOrdersRedux.rejected]: (state, action) => {
            state.isloading = true
        },

        [AddOrder.pending]: (state, action) => {
            state.isloading = true
        },
        [AddOrder.fulfilled]: (state, action) => {
            state.addOrderResponse = action.payload
            state.isloading = false

        },
        [AddOrder.rejected]: (state, action) => {
            state.isloading = true
        },
        [removeOrderRedux.pending]: (state, action) => {
            state.isloading = true
        },
        [removeOrderRedux.fulfilled]: (state, action) => {
            state.DeletedResponse = action.payload
            state.isloading = false

        },
        [removeOrderRedux.rejected]: (state, action) => {
            state.isloading = true
        },
        [getOneOrderRedux.pending]: (state, action) => {
            state.isloading = true
        },
        [getOneOrderRedux.fulfilled]: (state, action) => {
            state.GetOneOrder = action.payload
            state.isloading = false

        },
        [getOneOrderRedux.rejected]: (state, action) => {
            state.isloading = true
        },
        [updateOrderRedux.pending]: (state, action) => {
            state.isloading = true
        },
        [updateOrderRedux.fulfilled]: (state, action) => {
            state.UpdateResponse = action.payload
            state.isloading = false

        },
        [updateOrderRedux.rejected]: (state, action) => {
            state.isloading = true
        },
    }
})

// // Action creators are generated for each case reducer function
// export  { getAllCategories } = categoriesSlice.actions

export default OrdersSlice.reducer