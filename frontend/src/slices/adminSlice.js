import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = ""

export const adminSlice = createSlice({
    name: "userId",
    initialState: { value: initialStateValue },
    reducers: {
        setId: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setId } = adminSlice.actions
export default adminSlice.reducer