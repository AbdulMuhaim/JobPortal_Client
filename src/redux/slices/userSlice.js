import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    role:null,
    token:null,
    name:null,
    id:null,
    searchValue:null
}

const userAuthSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        userLogin : (state,action)=>{
            state.role = action.payload.role
            state.id = action.payload.id
            state.token = action.payload.token
            state.name = action.payload.name
        },
        userLogout : (state)=>{
            state.role = null
            state.id = null
            state.token = null
            state.name = null

        }
    }
})

export const {userLogin,userLogout} = userAuthSlice.actions
export default userAuthSlice.reducer