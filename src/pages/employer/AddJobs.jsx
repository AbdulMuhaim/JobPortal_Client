import AddJob from '../../components/employer/AddJob'
import Header from '../../components/employer/Header'

function AddJobs() {
  return (
    <div className='bg-slate-50 '>
        <Header/>
        <div className='lg:px-48 lg:pb-2 container mx-auto'>
            <AddJob/>
        </div>
    </div>
  )
}

export default AddJobs