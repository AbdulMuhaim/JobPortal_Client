import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import {useFormik} from 'formik'
import { loginSchema } from "../../yup/Schema";
import { loginForm } from "../../api/CommonApi";
import {useDispatch} from "react-redux"
import { verifyMail } from "../../api/CommonApi";
import  {toast}  from "react-hot-toast";
import GoogleLogin from './GoogleLogin'
import { userLogin } from "../../redux/slices/userSlice";
import {adminLogin} from '../../redux/slices/adminSlice'
import { employerLogin } from "../../redux/slices/employerSlice";



function Login({url}) {
  const [forgotPass,setForgotPass] = useState(false)
  const [email,setEmail] = useState('')

  const navigate = useNavigate() 
  const dispatch = useDispatch()


   // forgot password function //
async function sendOTP(){
  try {
    if(email.trim().length===0){
         toast.error('Enter email')
    }else{
         const response = await verifyMail(email,`/${url}`)
         toast.success(response.data.messasge)
      } 
  } catch (error) {
    console.log("error login jsx");
  }

 }

   // formik setup //
  const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:{email:"",password:"",role:""},
        validationSchema:loginSchema,  
        onSubmit: async (values)=>{
          const response = await loginForm(values,`/${url}`)

      if(response.status === 200){
        
            const name = response?.data?.name
            const id =  response?.data?.id
            const role =  response?.data?.role
            const token =  response?.data?.token 
            
            if(role==='Employee'){
              dispatch(userLogin({name,id,role,token}))
              toast.success(response.data.message)
              navigate('/')

            }else if(role==='Admin'){
              dispatch(adminLogin({name,id,role,token}))
              toast.success(response.data.message)
              navigate('/admin/dashboard')

            }else if(role==='Employer'){
              console.log(response.data.message);
              dispatch(employerLogin({name,id,role,token}))
              toast.success(response.data.message)
              navigate('/employer/home')
            }else{
              toast.error(response.data.message)
            }             
        }else {
          toast.error(response.data.message)
          console.log(response.data.message)
             
          }
        }
  })

  return (
    <>

{forgotPass?
     <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... py-6 flex flex-col justify-center sm:py-12"
        style={{ backgroundSize: "cover" }}   >
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder={email}
                      onChange={(e)=>setEmail(e.target.value)} 
                      required           
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                 
                  <div className="relative">
                    <button
                      type="button"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={sendOTP}
                    >
                      Send OTP
                    </button>
                  </div>
                  <p className="font-normal text-blue-500 hover:cursor-pointer" onClick={()=>setForgotPass(false)}>
                    Back to login?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

:
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... py-6 flex flex-col justify-center sm:py-12"
        style={{ backgroundSize: "cover" }}   >
    
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">

            <p>Email : muhaim25@gmail.com</p>
            <p>Password : 1234</p>
            <br />

<div className="flex justify-center"> <GoogleLogin url={url}/> </div>


              <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <small className="form-error text-red-500">
                        {errors.email}
                      </small>
                    ) : null}
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <small className="form-error text-red-500">
                        {errors.password}
                      </small>
                    ) : null}
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      LOGIN
                    </button>
                  </div>
                  <p className="font-normal" onClick={()=>setForgotPass(true)}>
                    <span className="text-blue-500 hover:cursor-pointer"> Forgot password? </span> 
                  </p>
                  <p className="font-normal	">
                    Don’t have an account yet?
                    <Link to='/signup'> <span className="text-blue-500 hover:cursor-pointer">
                      SIGN UP
                    </span> </Link> 
                  </p>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
}

export default Login;
