import { axiosInstance } from "../utils/ApiConnections";

export async function registerForm(credentials){
    try {
        const data = await axiosInstance.post('/register',credentials)
        return data
    } catch (error) {
        console.log("register error");
    }
}

export async function loginForm(credentials,url){
    console.log(url); 

    try {
        if(url==='/login'){
        console.log("user");
        const data = await axiosInstance.post('/login',credentials)
        return data 

       }else if(url==='/employer/login'){
        const data = await axiosInstance.post('/employer/login',credentials)
        return data 
        
       }else if(url==='/admin/login'){
        const data = await axiosInstance.post('/admin/login',credentials)
        return data 
       }
    } catch (error) { 
        console.log("login error"); 
    }
}

export async function verifyMail(email,url){
    try {   
        const requestData = {email:email}

        if(url==='/login'){
        const data = await axiosInstance.post('/forgotPassword',requestData)
        return data 

       }else if(url==='/employer/login'){
        const data = await axiosInstance.post('/employer/forgotPassword',requestData)
        return data

       }else if(url==='/admin/login'){
        const data = await axiosInstance.post('/admin/forgotPassword',requestData)
        return data 
       }
    } catch (error) {
        console.log("verifyMail error");
    }
}

export async function setNewPassword(password,Id,url){
    try {

        if(url==='/login'){
            const data = await axiosInstance.post('/setNewPassword',{password,Id})
            return data 
    
           }else if(url==='/employer/login'){
            const data = await axiosInstance.post('/employer/forgotPassword',{})
            return data
    
           }else if(url==='/admin/login'){
            const data = await axiosInstance.post('/admin/forgotPassword',{})
            return data 
           }

    } catch (error) {
        console.log("setNewPassword error");
    }
}

export async function setGoogleProfile(profile,url){
    try {
        const profileDt = profile
        if(url==='/login'){
            const data = await axiosInstance.post('/googleLogin',{profileDt})
            return data 
    
           }else if(url==='/employer/login'){
            const data = await axiosInstance.post('/employer/googleLogin',{})
            return data
    
           }else if(url==='/admin/login'){
            const data = await axiosInstance.post('/admin/googleLogin',{})
            return data 
           }
    } catch (error) {
        console.log("google API error");
    }
}




  