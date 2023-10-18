import {Routes,Route, Navigate} from 'react-router-dom' 
import CommonLogin from '../pages/common/CommonLogin'
import HomeEmp from '../pages/employer/HomeEmp'
import Jobs from '../pages/employer/Jobs'
import Plan from '../pages/employer/Plan'
import AddJobs from '../pages/employer/AddJobs'
import { useSelector } from 'react-redux'
import Applications from '../pages/employer/Applications'
import EmpIoyeeDetails from '../pages/employer/EmpIoyeeDetails'
import Messages from '../pages/employer/Messages'
import ProfilePage from '../pages/employer/ProfilePage'
import PaymentSuccess from '../components/employer/PaymentSuccess'
import PaymentFail from '../components/employer/PaymentFail'
import NotFoundPage from '../pages/404'

function EmployerRoutes() {
  const employerAuth = Boolean(useSelector((state)=>state.Employer.token))
  return (
<Routes> 

<Route path='/login' element={ employerAuth? <Navigate to='/employer/home'/> : <CommonLogin url= 'employer/login'/>}/>
<Route path='/home' element={ employerAuth? <HomeEmp /> : <Navigate to='/employer/login'/> }/>
<Route path='/jobs' element={ employerAuth? <Jobs/> : <Navigate to='/employer/login'/> }/>
<Route path='/addjob' element={ employerAuth? <AddJobs/> : <Navigate to='/employer/login'/> }/>
<Route path='/plan' element={ employerAuth? <Plan/> : <Navigate to='/employer/login'/> }/>
<Route path='/applications' element={ employerAuth? <Applications/> : <Navigate to='/employer/login'/> }/>
<Route path='/employeeInfo' element={ employerAuth? <EmpIoyeeDetails/> : <Navigate to='/employer/login'/> }/>
<Route path='/chat' element={ employerAuth? <Messages /> : <Navigate to='/employer/login'/> }/>
<Route path='/profile' element={ employerAuth? <ProfilePage /> : <Navigate to='/employer/login'/> }/>
<Route path='/paymentSuccess' element={  <PaymentSuccess />  }/>
<Route path='/paymentFail' element={  <PaymentFail />  }/>
<Route path='*' element={<NotFoundPage/>} />

</Routes>   
  )
}

export default EmployerRoutes


