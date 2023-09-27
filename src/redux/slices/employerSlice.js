import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    role:null,
    token:null,
    name:null,
    id:null
}

const adminAuthSlice = createSlice({
    name:'employerAuth',
    initialState,
    reducers:{
        employerLogin:(state,action)=>{
            state.role = action.payload.role
            state.id = action.payload.id
            state.token = action.payload.token
            state.name = action.payload.name       
        },
        employerLogout : (state)=>{
            state.role = null
            state.id = null
            state.token = null
            state.name = null
        }
    }
})

export const {employerLogin,employerLogout} = employerAuthSlice.actions
export default adminAuthSlice.reducer