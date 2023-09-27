import {axiosInstance} from '../utils/ApiConnections'

export async function addNewCategory(newCategory){
    try {
        const requestData = {newCategory:newCategory}
        const data = await axiosInstance.post('/admin/addCategory',requestData)
        return data
    } catch (error) {
        console.log("register error");
    }
}

export async function fetchCategories(){
    try {
        const data = await axiosInstance.get('/admin/fetchCategories')
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function editCategory(newCategory,oldCategory){
    try {
       const data = await axiosInstance.post('/admin/editCategory',{newCategory,oldCategory})
       return data  
    } catch (error) {
        console.log(error);
    }
}

export async function fetchUsers(){
    try {
        const data = await axiosInstance.get('/admin/fetchUsers')
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function userStatus(email){
    const requestData = {email:email}
    try {
        const data = await axiosInstance.post('/admin/userStatus',requestData)
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function fetchEmployers(){
    try {
    const data = await axiosInstance.get('/admin/fetchEmployers')
    return data
    } catch (error) {
        console.log(error);
    }
}

export async function employerStatus(email){
    try {
    const requestData = {email:email}    
    const data = await axiosInstance.post('/admin/employerStatus',requestData)
    return data
    } catch (error) {
       console.log(error);
    }
}

export async function fetchJobs(){
    try {
        const data = await axiosInstance.get('/admin/fetchJobs')
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function jobStatus(id){
    try {
    const requestData = {id:id}
    const data = await axiosInstance.post('/admin/jobStatus',requestData)
    return data
    } catch (error) {
       console.log(error);
    }
}

