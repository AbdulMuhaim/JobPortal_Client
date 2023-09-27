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
