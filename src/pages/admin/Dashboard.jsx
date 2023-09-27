import Sidebar from '../../components/admin/adminHome.jsx/Sidebar'
import Header from '../../components/admin/adminHome.jsx/Header'
import Cards from '../../components/admin/adminHome.jsx/Cards'


function Dashboard() {
  return (
    <>
    <div className='h-full w-full '>
       <Header/>
        <Sidebar/>
          <div className='h-14 w-full bg-slate-200 '></div>  
         <div className="flex">
          <div className='w-10 md:w-64 h-screen flex-shrink-0 flex'></div>
          <div className='p-1 md:p-0 w-full'>
          <Cards/>
          </div>
        </div>
        </div>
    </>
  )
}

export default Dashboard