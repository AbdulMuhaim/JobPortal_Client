import {Routes,Route} from 'react-router-dom' 
import CommonLogin from '../pages/common/CommonLogin'
import CommonRegister from '../pages/common/CommonRegister'
import Jobs from '../pages/user/Jobs'
import Team from '../pages/user/Team'
import Contact from '../pages/user/Contact'
import Profile from '../pages/user/Profile'
import PasswordNew from '../pages/common/PasswordNew'
import HomeUser from '../pages/user/HomeUser'

function UserRoutes() {
  return (
<Routes>
    
       <Route path = '/' element={<HomeUser/>}/>
       <Route path = '/login' element={ <CommonLogin url= 'login'/>}/>
       <Route path='/signup' element={<CommonRegister/>}/>
       <Route path='/jobs' element={<Jobs/>}/>
       <Route path='/team' element={<Team/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/resetPassword/:userId' element={<PasswordNew url='login'/>}/>

</Routes>
  )
}

export default UserRoutes


