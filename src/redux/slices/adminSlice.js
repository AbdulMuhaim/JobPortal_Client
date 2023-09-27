import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    role:null,
    token:null,
    name:null,
    id:null
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        adminLogin:(state,action)=>{
            state.role = action.payload.role
            state.id = action.payload.id
            state.token = action.payload.token
            state.name = action.payload.name       
        },
        adminLogout : (state)=>{
            state.role = null
            state.id = null
            state.token = null
            state.name = null
        }
    }
})

export const {adminLogin,adminLogout} = adminAuthSlice.actions
export default adminAuthSlice.reducer