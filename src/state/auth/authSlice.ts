import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
    name: string,
    _id: string,
    email: string,
}

const initialState: User = {
    name: "",
    _id:"",
    email: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.name = action.payload.name
            state._id = action.payload._id
            state.email = action.payload.email
            console.log(state._id)
        },
        logOut: (state) => {
            state.name = ""
            state._id = ""
            state.email = ""
            
        }
    }
})
export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer