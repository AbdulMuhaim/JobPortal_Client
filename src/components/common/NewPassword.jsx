import {useFormik} from 'formik'
import { newPasswordSchema } from '../../yup/Schema';
import { setNewPassword } from '../../api/CommonApi';
import { useNavigate, useParams } from 'react-router';

function NewPassword({url}) {

    const {userId} = useParams()
    const navigate = useNavigate()
    const initialValues = {
        password:"",
        rePassword:""
      };
    const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues,
        validationSchema:newPasswordSchema,
         onSubmit: async (values) => {
          const response = await setNewPassword(values.password,userId,`/${url}`);
          if (response.data.message ==='Password changed') {
            console.log(response.data.message); 
            navigate('/login')
          } else {
            console.log(response.data.message);
          }
        },
       
      })
  
      
  return (

   <form onSubmit={handleSubmit}>

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
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      required 
                      list="name-list"          
                    />
                    {errors.password && touched.password ? (
                     <small className="form-error text-red-500">{errors.password}</small>
                     ) : null}
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      New Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="rePassword"
                      name="rePassword"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="rePassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.rePasswordpassword}
                      required
                      list="name-list"           
                    />
                    {errors.rePassword && touched.rePassword ? (
                     <small className="form-error text-red-500">{errors.rePassword}</small>
                     ) : null}
                    <label
                      htmlFor="rePassword"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Confirm New Password
                    </label>
                  </div>
                 
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </form>
  )
}

export default NewPassword