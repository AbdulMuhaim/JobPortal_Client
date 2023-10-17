import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchJobs, jobIsBlocked } from "../../api/EmployerApi";


function JobsTable() {

  const [allJobs,setAllJobs] = useState([]);
  const [currenctPlan,setCurrentPlan] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    fetchJobs()
    .then((res)=>{
      setCurrentPlan(res.data.empPlan.currentPlan)
      setAllJobs(res.data.jobs)
    }).catch((err)=>{
      console.log(err)
    })

  },[])

  const checkPlan = ()=> {
    currenctPlan? navigate('/employer/addjob') : navigate('/employer/plan')
  }

  const isBlocked = (id)=> {
    const updatedState = allJobs.map((jobs) => jobs._id === id ? {...jobs,isBlocked : !jobs.isBlocked} : jobs);
    setAllJobs(updatedState)
    jobIsBlocked(id)
  }

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-blue-900 dark:bg-gray-900 ">
          <div>
            <button
              className="inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={checkPlan}
            >
              POST A NEW JOB
              <svg viewBox="0 0 10 6"></svg>
            </button>
          </div>
        </div>


        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Working Hours
              </th>
              <th scope="col" className="px-6 py-3">
                Experience
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
               Action
              </th>           
            </tr>
          </thead>

<tbody>
{allJobs.map((data,index)=>(

<tr key={index}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{index+1}
</td>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{data.categoryName}
</td>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{data.companyName}
</td>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{data.workingTime}
</td>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{data.experience}
</td>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{data.status?'Approved':'Rejected'}
</td>
<td className="px-6 py-4">
  <a onClick={()=> isBlocked(data._id)}
    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
  >
    {data.isBlocked? 'Unblock' : 'Block'}
  </a>
</td>
</tr>

  ))}

</tbody>
  </table>
      </div>
    );
  }
  
  export default JobsTable;
  




 
     

