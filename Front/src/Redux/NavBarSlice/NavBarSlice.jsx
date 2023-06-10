import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: true,
}

export const NavBarSlice = createSlice({

    name: "navBar",
    initialState,
    reducers: {

        changeToggle: (state, action) => {
            state.toggle = !state.toggle
        }
    }
})

export const { changeToggle } = NavBarSlice.actions
export default NavBarSlice.reducer