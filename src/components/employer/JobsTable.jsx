import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteJob, fetchJobs } from "../../api/EmployerApi";


function JobsTable() {

  const [allJobs,setAllJobs] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    fetchJobs()
    .then((res)=>{
      setAllJobs(res.data.jobs)
    }).catch((err)=>{
      console.log(err)
    })

  },[])

  const removeJob = (id )=> {
    const updatedState = allJobs.filter((jobs) => jobs._id !== id);
    setAllJobs(updatedState)
    deleteJob(id)
  }

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-blue-900 dark:bg-gray-900 ">
          <div>
            <button
              className="inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={()=>navigate('/employer/addjob')}
            >
              POST A NEW JOB
              <svg viewBox="0 0 10 6"></svg>
            </button>
          </div>
  
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for categories"
            />
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
  <a onClick={()=> removeJob(data._id)}
    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
  >
    Delete
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
  




 
     

