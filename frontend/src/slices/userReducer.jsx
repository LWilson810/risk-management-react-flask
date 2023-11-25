import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    fullname: "",
    email: "",
    loggedIn: false
}

export const loginUser = createAsyncThunk(
    'user/login',
    async (email, password) => {
        const response = await userService.singin(email, password);
        return response;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggedUser: (state) => {
            state.loggedIn = true;
        },
        logoutUser: (state) => {
            state.loggedIn = false;
        }
    },
    
})

export const { loggedUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;