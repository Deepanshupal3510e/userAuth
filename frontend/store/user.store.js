import { createSlice } from '@reduxjs/toolkit';

const initialState = () => {
    return (
        {
            name : "",
            email : "",
            _id : "",
            profilePic : "",
            role : "",
            verified : "",
        }
    )
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUserDetails : (state , action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state._id = action.payload._id;
            state.profilePic = action.payload.profilePic;
            state.role = action.payload.role;
            state.verified = action.payload.verified

        },
        logOutUser : (state , action) => {
            state.name = "";
            state.email = "";
            state._id = "";
            state.profilePic = "";
            state.role = "";
            state.verified = ""
        }
    }

})

export const { setUserDetails , logOutUser } = userSlice.actions;
export default userSlice.reducer;