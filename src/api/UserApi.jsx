import { axiosInstance } from "../utils/ApiConnections"

export async function profileData(data){
    const res = await axiosInstance.post('/profileData',data)
    return res
}

export async function fetchProfileData(){
    try {
        const data = await axiosInstance.get('/fetchProfileData')
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function removeProfileData(data,role){
    const res = await axiosInstance.post('/removeProfileData',{data,role})
    return res
}




export async function fetchJobs(dataCount, filterData, search) {
 try {
    const requestData = {dataCount:dataCount,filterData:filterData,search:search}
    const res = await axiosInstance.post('/fetchJobs',requestData)
    return res
 } catch (error) {
    console.log(error);
 }
}


export async function fetchCategories(){
    try {
        const data = await axiosInstance.get('/fetchCategories')
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function jobApplication(id,cv,letter){
    try {
        const requestData = {id:id,cv:cv,letter:letter}
        const data = await axiosInstance.post('/jobApplication',requestData)
        
        return data
    } catch (error){
        console.log(error);
    }
}

export async function newOTP(email){
    const requestData = {email:email}
    const data = await axiosInstance.post('/newOTP',requestData)
    return data
}


export async function fetchJobDetails(jobId){
    const requestData = {jobId}
    const data =  await axiosInstance.post('/fetchJobDetails',requestData)
    return data
}

export async function initializeChat(id){
    const requestData = {id}
    const status =  await axiosInstance.post('/chat',requestData)
    return status
}

export async function fetchNotification(){
    const data = await axiosInstance.get('/fetchNotification')
    return data
}







