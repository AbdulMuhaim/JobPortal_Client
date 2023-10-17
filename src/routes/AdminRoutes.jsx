import {Routes,Route, Navigate} from 'react-router-dom' 
import CommonLogin from '../pages/common/CommonLogin'
import Dashboard from '../pages/admin/Dashboard'
import Categories from '../pages/admin/Categories'
import Employers from '../pages/admin/Employers'
import Employees from '../pages/admin/Employees'
import ProfilePage from '../components/admin/adminProfile/ProfilePage'
import { useSelector } from 'react-redux'
import Jobs from '../pages/admin/Jobs'
import NotFoundPage from '../pages/404'

function AdminRoutes() {

  const adminAuth = Boolean(useSelector((state)=>state.Admin.token))

  return (
<Routes>

<Route path='/login' element={ adminAuth? <Navigate to='/admin/dashboard'/> : <CommonLogin  url= 'admin/login'/>}/>     
<Route path='/dashboard' element={ adminAuth? <Dashboard/> : <Navigate to='/admin/login'/>  } />
<Route path='/categories' element={ adminAuth? <Categories/> : <Navigate to='/admin/login'/>} />
<Route path='/employers' element={ adminAuth? <Employers/> : <Navigate to='/admin/login'/>} />
<Route path='/employees' element={ adminAuth? <Employees/> : <Navigate to='/admin/login'/>} />
<Route path='/profile' element={ adminAuth? <ProfilePage/> : <Navigate to='/admin/login'/>} />
<Route path='/jobs' element={ adminAuth? <Jobs/> : <Navigate to='/admin/login'/>} />
<Route path='*' element={<NotFoundPage/>} />

</Routes>
  )
}

export default AdminRoutes


