
import { PhotoIcon} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../api/AdminApi';
import { useFormik } from 'formik';
import { jobSchema } from '../../yup/Schema';
import { useNavigate } from 'react-router';
import { addJob } from '../../api/EmployerApi';
import axios from 'axios';
import toast from 'react-hot-toast';


const initialValues = {
categoryName:"",
companyName:"",
skills:"",
qualifications:"",
description:"",
experience:"",
workingTime:"",
email:"",
country:"",
street:"",
city:"",
state:"",
zip:"",
image:null
}


export default function AddJob() {

  const [allCategories,setAllCategories] = useState([]);
  const [previewImage,setPreviewImage] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    fetchCategories()
    .then((res)=>{
      setAllCategories(res.data.categories)
    }).catch((err)=>{
      console.log(err)
    })
  },[])



  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: jobSchema,
    onSubmit: async (values) => {
      try {
        const cloudName = 'df625ktpb';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
        const formData = new FormData();
        formData.append('file', values.image);
        formData.append('upload_preset', 'JobPortal'); 
  
        const response = await axios.post(url, formData);
        const imageUrl = response.data.secure_url;
        
        const res = await addJob(values,imageUrl)
        toast.success(res.data.message)

  
      } catch (error) {
        console.log(error);
      }
      navigate('/employer/jobs')
    },
  });
  
  

  
  


  return (
    <div className='px-20 py-1 bg-slate-200 mt-3 rounded-xl outline outline-gray-300 shadow-md'>
     <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="space-y-12 ">

      

        <div className="border-b border-gray-900/10 pb-12">
            <h1 className='text-center text-lg font-bold m-2'>Enter Job Details</h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="sm:col-span-4 md:col-span-1">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Job Title <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="categoryName"
                  name="categoryName"
                  type='text'
                  autoComplete="categoryName"
                  className="block w-full rounded-md border-0 py-1.5 required text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryName}
                >
                    <option value=""></option>
                    {allCategories.map((data)=>(
                  <option value={data.categoryName} key={data.categoryName}>{data.categoryName}</option>
                    ))}
                </select>
                {errors.categoryName && touched.categoryName ? (
                 <small className="form-error text-red-500">{errors.categoryName}</small>
                 ) : null}
              </div>
            </div>


           
          <div className="sm:col-span-4 md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Company Name <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                />
                 {errors.companyName && touched.companyName ? (
                 <small className="form-error text-red-500">{errors.companyName}</small>
                 ) : null}
              </div>
            </div>

            <div className="sm:col-span-4 md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Skills <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  autoComplete="skills"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.skills}
                />
                {errors.skills && touched.skills ? (
               <small className="form-error text-red-500">{errors.skills}</small>
                ) : null}
              </div>
            </div>

            <div className="sm:col-span-4 md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Qualifications <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  id="qualifications"
                  name="qualifications"
                  type="text"
                  autoComplete="qualifications"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.qualifications}
                />
                {errors.qualifications && touched.qualifications ? (
                  <small className="form-error text-red-500">{errors.qualifications}</small>
                  ) : null}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About the Job <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                   {errors.description && touched.description ? (
                  <small className="form-error text-red-500">{errors.description}</small>
                  ) : null}
              </div>
            </div>




<div className="col-span-full">
  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
    Cover photo <span className='text-red-500'>*</span>
  </label>
  
  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
    <div className="text-center">
      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
      <div className="mt-4 flex text-sm leading-6 text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span>Upload a file</span>
          <input
            id="file-upload"
            name="image"
            type="file"
            onChange={(e) => {
              const selectedImage = e.target.files[0];
              setFieldValue("image", selectedImage);

              if (selectedImage) {
                const imageUrl = URL.createObjectURL(selectedImage);
                setPreviewImage(imageUrl);
              }
            }}
            onBlur={handleBlur}
            className="sr-only"
          />
        </label>
        <p className="pl-1">or drag and drop</p>
        {errors.image && touched.image ? (
          <small className="form-error text-red-500">{errors.image}</small>
        ) : null}
      </div>
      {previewImage && (
        <div>
          <img src={previewImage} alt="Selected" />
        </div>
      )}
      {previewImage? null : <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>}
    </div>
  </div>
</div>




          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Experience <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="experience"
                  name="experience"
                  autoComplete="experience-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.experience}
                >
                  <option value=""></option>
                  <option>Fresher</option>
                  <option>1 Year+</option>
                  <option>2 Year+</option>
                  <option>3 Year+</option>
                  <option>4 Year+</option>
                  <option>5 Year+</option>
                </select>
                {errors.experience && touched.experience ? (
                 <small className="form-error text-red-500">{errors.experience}</small>
                 ) : null}
              </div>
            </div>

            <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Working Time <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <select
                 id="workingTime"
                 name="workingTime"
                 autoComplete="workingTime"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workingTime}
                >
                  <option value=""></option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                </select>
                {errors.workingTime && touched.workingTime ? (
                 <small className="form-error text-red-500">{errors.workingTime}</small>
                 ) : null}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address <span className='text-red-500'>*</span>
              </label> 
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                 {errors.email && touched.email ? (
                  <small className="form-error text-red-500">{errors.email}</small>
                  ) : null}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                >
                  <option value=""></option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>India</option>

                </select>
                {errors.country && touched.country ? (
                 <small className="form-error text-red-500">{errors.country}</small>
                 ) : null}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street"
                  id="street"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.street}
                />
                 {errors.street && touched.street ? (
                  <small className="form-error text-red-500">{errors.street}</small>
                  ) : null}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                 {errors.city && touched.city ? (
                  <small className="form-error text-red-500">{errors.city}</small>
                  ) : null}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  ty
                  pe="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                />
                 {errors.state && touched.state ? (
                  <small className="form-error text-red-500">{errors.state}</small>
                  ) : null}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code <span className='text-red-500'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zip}
                />
                 {errors.zip && touched.zip ? (
                  <small className="form-error text-red-500">{errors.zip}</small>
                  ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={()=>navigate('/employer/jobs')} type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>

      </form>

    </div>
  )
}

