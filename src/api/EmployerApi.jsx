import { axiosInstance } from "../utils/ApiConnections";

export async function addJob(values,imageUrl){
 
    try {
        const data = await axiosInstance.post('/employer/addJob',{values,imageUrl}) 
        return data
    } catch (error) {
        console.log(error)
    }

}   

export async function fetchJobs(){
    try {
        const data = await axiosInstance.get('/employer/fetchJobs')
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function deleteJob(id){
    try {
        const requestData = {id:id}
        const response = await axiosInstance.post('/employer/deleteJob',requestData)
        return response
    } catch (error) {
        console.log(error)
    }
}