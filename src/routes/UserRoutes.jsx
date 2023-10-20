import {Routes,Route, Navigate} from 'react-router-dom' 
import CommonLogin from '../pages/common/CommonLogin'
import CommonRegister from '../pages/common/CommonRegister'
import Jobs from '../pages/user/Jobs'
import Team from '../pages/user/Team'
import Contact from '../pages/user/Contact'
import Profile from '../pages/user/Profile'
import PasswordNew from '../pages/common/PasswordNew'
import HomeUser from '../pages/user/HomeUser'
import { useSelector } from 'react-redux'
import JobInDetail from '../pages/user/JobInDetail'
import Messages from '../pages/user/Messages'
import NotFoundPage from '../pages/404'
import Notification from '../pages/user/Notification'

function UserRoutes() {
  const userAuth = Boolean(useSelector((state)=>state.User.token))

  return (
<Routes>
    
       <Route path = '/' element={ <HomeUser/>}/>
       <Route path = '/login' element={ userAuth? <Navigate to='/'/> : <CommonLogin url= 'login'/>}/>
       <Route path='/signup' element={ <CommonRegister/>}/>
       <Route path='/jobs' element={<Jobs/>}/>
       <Route path='/team' element={<Team/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/profile' element={userAuth? <Profile/> : <Navigate to='/login'/>}/>
       <Route path='/resetPassword/:userId' element={ <PasswordNew url='login'/>}/>
       <Route path='/jobDetails' element={userAuth? <JobInDetail/> : <Navigate to='/login'/> }/>
       <Route path='/chat' element={userAuth? <Messages/> : <Navigate to='/login'/>}/>
       <Route path='/notifications' element={userAuth? <Notification/> : <Navigate to='/login'/>}/>
       <Route path='*' element={<NotFoundPage/>} />



</Routes>
  )
}

export default UserRoutes


