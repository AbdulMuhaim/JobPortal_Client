import React, { useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/userSlice";
import axios from "axios";
import { setGoogleProfile } from "../../api/CommonApi";
import { toast } from "react-hot-toast";

const LoginGoogle = ({url}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => { setUser(codeResponse) },
        onError: (error) => { console.log('Login Failed:', error); toast.error('Login Failed:') }
    });

    useEffect(
        () => {
            googleLogin()
        },
        [user]
    );


   const googleLogin = () => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                } 
            })
            .then((res) => {
                VerifyGoogleLogin(res.data)
            })
            .catch((err) => { console.log(err, "Error") });

    }

    const VerifyGoogleLogin = async(profile)=>{
        const response = await setGoogleProfile(profile,`/${url}`)
        if(response.status === 200){
            const name = response?.data?.name
            const id =  response?.data?.id
            const role =  response?.data?.role
            const token =  response?.data?.token 
            console.log(name,id,role,token); 

            if(role==='Employee'){
              console.log(response.data.message);
              dispatch(userLogin({name,id,role,token}))
              toast.success('welcome')
              navigate('/')

            }else if(role==='Admin'){
              console.log(response.data.message);
              // dispatch(Login({name,id,role,token}))
              navigate('/admin/dashboard')

            }else if(role==='Employer'){
              console.log(response.data.message);
              // dispatch(Login({name,id,role,token}))
              navigate('/employer/home')
            }              
        }else {
          console.log(response.data.message); 
             
          }
    }
 
  return (
    <div>
      <GoogleLogin onSuccess={login} />
    </div>
  );
};



export default LoginGoogle;
