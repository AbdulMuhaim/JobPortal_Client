import { Link,useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import { signUpSchema } from '../../yup/Schema'
import { registerForm } from '../../api/CommonApi'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {CgSpinner} from 'react-icons/cg'

const initialValues = {
    role:"",
    name:"",
    email:"",
    mobile:"",
    password:"",
    confirmPassword:"",
  };


  
function Signup() {

    const navigate = useNavigate()
    const [showOtp,setShowOTP] = useState(false)
    const [loading,setLoading] = useState(false)
    const [otp,setOtp] = useState('')

  

    const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues,
        validationSchema:signUpSchema,
         onSubmit: async (values) => {
          const response = await registerForm(values)
                      
          // if(response.data.message === 'ready for otp'){
          //   console.log(response?.data?.message);
          // }else{
          //   toast.error(response?.data?.message)
          // }
        },
       
      })
    

  return (
    <>
    <Toaster toastOptions={{duration:5000}}/>
{showOtp?  
<div
 className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... py-6 flex flex-col justify-center sm:py-12"
 style={{ backgroundSize: "cover" }}
 >
 <div className="relative py-3 sm:max-w-xl sm:mx-auto">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
  <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <div className="max-w-md mx-auto">
      <div>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

          <div className="relative">
            <input
              autoComplete="off"
              id="otp"
              name="otp"
              type="text"
              onChange={(e)=>setOtp(e.target.value)}
              value={otp}
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
              placeholder="Enter Otp Here"
            />
            <label
              htmlFor="otp"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
            Enter your OTP
            </label>
          </div>
          <br />
          <div className="relative">
            <button
              onClick={onOTPVerify}
              type="submit"
              className="bg-blue-500 text-white rounded-md px-2 py-1 flex justify-center gap-1 items-center">
                {loading && <CgSpinner size={20} className=' animate-spin'/>}
               <span>Verify OTP</span> 
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>



    : <div
        className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... py-6 flex flex-col justify-center sm:py-12"
        style={{ backgroundSize: "cover" }}
      >
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

               
      <form onSubmit={handleSubmit} className="mt-6">

      <div className="relative">
      <input
        autoComplete="off"
        id="role"
        name="role"
        type="text"
        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
        placeholder="role"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.role}
        list="name-list"
      />
      {errors.role && touched.role ? (
        <small className="form-error text-red-500">{errors.role}</small>
      ) : null}
      <label
        htmlFor="role"
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        Select who you are..
      </label>
      <datalist id="name-list">
        <option value="Employee" />
        <option value="Employer" />
      </datalist>
    </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    /> 
                    {errors.name && touched.name ? (
                      <small className="form-error text-red-500">
                        {errors.name}
                      </small>
                    ) : null}
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email Address"
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
                      id="mobile"
                      name="mobile"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                    />
                     {errors.mobile && touched.mobile ? (
                      <small className="form-error text-red-500">
                        {errors.mobile}
                      </small>
                    ) : null}
                    <label
                      htmlFor="mobile"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Mobile
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
                    <input
                      autoComplete="off"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                     {errors.confirmPassword && touched.confirmPassword ? (
                      <small className="form-error text-red-500">
                        {errors.confirmPassword}
                      </small>
                    ) : null}
                    <label
                      htmlFor="confirmPassword"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                    Confirm Password
                    </label>
                  </div>
                  <br />
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1">SIGN UP
                    </button>
                  </div>
                  <br />
                  <p className="font-normal	">
                     Already have an account?
                   <Link to='/login'> <span className="text-blue-500 hover:cursor-pointer">LOGIN</span> </Link>
                </p>
              </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      }

    </>
  )
}

export default Signup