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

export async function jobIsBlocked(id){
    try {
        const requestData = {id:id}
        const response = await axiosInstance.post('/employer/jobIsBlocked',requestData)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function fetchApplications(){
    try {
        const data = await axiosInstance.get('/employer/fetchApplications')
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function employeeInfo(email){
    try {
        const requestData = {email:email}
        const data = await axiosInstance.post('/employer/employeeInfo',requestData)
        return data
    } catch (error) {
        console.log(error) 
    }
}

export async function initializeChat(id){
    const requestData = {id}
    const status =  await axiosInstance.post('/employer/chat',requestData)
    return status
}

export async function payment(amount){
    const data =  await axiosInstance.get(`/employer/payment?amount=${amount}`)
    return data
}

export async function fetchEmployerPlan() {
    try {
      const response = await axiosInstance.get('/employer/fetchEmployerPlan');
      const currentPlan = response.data.currentPlan;
      return currentPlan;
    } catch (error) {
      console.error(error);
    }
  }

export async function applicationStatus(appId,status){
try {
   const requestData = {appId,status}
   const response = await axiosInstance.post('/employer/applicationStatus',requestData)
   return response
} catch (error) {
    console.log(error)
}
}
  

  