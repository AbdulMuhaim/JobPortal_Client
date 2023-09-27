import {BrowserRouter,Routes,Route} from 'react-router-dom' 

// import { useSelector } from 'react-redux';
import {Toaster} from 'react-hot-toast';

import UserRoutes from './routes/userRoutes';
import EmployerRoutes from './routes/employerRoutes';
import AdminRoutes from './routes/AdminRoutes';



function App() {

//   const userAuth = Boolean(useSelector((state)=>state.User.token))
//   const adminAuth = Boolean(useSelector((state)=>state.Admin.token))

  return (
    <>

    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} /> 
    <Routes>
                  
              {/* USER ROUTES */} 
<Route path='/*' element={<UserRoutes/>}/>

              {/* EMPLOYER ROUTES */}
<Route path="/employer/*" element={<EmployerRoutes/>} />
        
              {/* ADMIN ROUTES */}
<Route path="/admin/*" element={<AdminRoutes/>} />

    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
