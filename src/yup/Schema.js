import * as Yup from "yup"


export const signUpSchema = Yup.object({
    role:Yup.string().required("please select your role").oneOf(["Employer","Employee"]),
    name: Yup.string().min(2).max(20).required("please enter your name"),
    email: Yup.string().email().required("please enter your email"),
    mobile: Yup.string().required("please enter your mobile")
    .matches(/^\d{10}$/, "mobile number must have 10 digits"),
    password: Yup.string().min(4).required("please enter your password"),
    confirmPassword: Yup.string()
      .required("please re enter your password")
      .oneOf([Yup.ref('password'), null], "password doesn't match")
  });

  export const loginSchema = Yup.object({
    email: Yup.string().email().required("please enter your email"),
    password: Yup.string().min(4).required("please enter password")
  })

  export const newPasswordSchema = Yup.object({
    password: Yup.string().min(4).required("please enter your new password"),
    rePassword:  Yup.string()
    .required("please re enter your new password")
    .oneOf([Yup.ref('password'), null], "password doesn't match")
  })

  export const jobSchema = Yup.object({
  companyName:Yup.string().required("please enter your company name"),
  skills:Yup.string().required("please specify the skills"),
  qualifications:Yup.string().required("please specify the qualifications"),
  description:Yup.string().required("please add a description"),
  email:Yup.string().email().required("please enter your company email"),
  street:Yup.string().required("please enter your street"),
  city:Yup.string().required("please enter your city"),
  state:Yup.string().required("please enter state"),
  zip:Yup.number().min(6).required("please enter your zip"),
  image:Yup.mixed().required('Image is required'),
  categoryName:Yup.string().required("please select the job title"),
  experience:Yup.string().required("please select the experience"),
  workingTime:Yup.string().required("please select the working time"),
  country:Yup.string().required("please select your coutry"),




  })