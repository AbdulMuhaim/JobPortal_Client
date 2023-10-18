import {BrowserRouter,Routes,Route} from 'react-router-dom' 

// import { useSelector } from 'react-redux';
import {Toaster} from 'react-hot-toast';

import UserRoutes from './routes/UserRoutes';
import EmployerRoutes from './routes/EmployerRoutes';
import AdminRoutes from './routes/AdminRoutes';



function App() {


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
