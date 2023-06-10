import { createAsyncThunk } from "@reduxjs/toolkit"

import { useInsertData } from "../../Hooks/useInsertData"

// export const loginAction = createAsyncThunk('login/getAll', async (body) => {
//     const response = await useInsertData("/api/v1/auth/login", body)
//     console.log(response)
//     return response.data

// })



export const loginAction = createAsyncThunk('login/getAll', async (body) => {

    try {

        const response = await useInsertData("/api/v1/auth/login", body)

        return response

    } catch (error) {
        return error.response

    }
})


