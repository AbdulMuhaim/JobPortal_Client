import {Routes,Route} from 'react-router-dom' 
import CommonLogin from '../pages/common/CommonLogin'
import HomeEmp from '../pages/employer/HomeEmp'
import Jobs from '../pages/employer/Jobs'
import Plan from '../pages/employer/Plan'
import AddJobs from '../pages/employer/AddJobs'
import Test from '../components/employer/Test'

function EmployerRoutes() {
  return (
<Routes> 

<Route path='/login' element={<CommonLogin url= 'employer/login'/>}/>
<Route path='/home' element={<HomeEmp />}/>
<Route path='/jobs' element={<Jobs/>}/>
<Route path='/addjob' element={<AddJobs/> }/>
<Route path='/plan' element={<Plan/>}/>
<Route path='/test' element={<Test/>}/>

</Routes>   
  )
}

export default EmployerRoutes


