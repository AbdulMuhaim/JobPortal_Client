import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchJobs, jobStatus } from '../../../api/AdminApi'

function JobsTable() {

    const [jobs,setFetchedJobs] = useState([])

    useEffect(()=>{
        fetchJobs()
        .then((res)=>{
            setFetchedJobs(res.data.jobs)
        }).catch((err)=>{
          console.log(err);
        })
      },[])

      const changeStatus = (id)=>{
        const newData = jobs.map((obj)=>obj._id===id ? {...obj,status : !obj.status} : obj)
        setFetchedJobs(newData)
        const response = jobStatus(id)
        if (!response.data.err) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }

  return (
    <div>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Zip
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

{jobs.map((data,index)=>(

<tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    {index+1}
  </td>
  <td className="px-6 py-4">
    {data.categoryName}
  </td>
  <td className="px-6 py-4">
    {data.companyName}
  </td>
  <td className="px-6 py-4">
    {data.email}
  </td>
  <td className="px-6 py-4">
    {data.zip}
  </td>
  <td className="px-6 py-4">
    {data.status?'Active':'Blocked'}
  </td>
  <td className="px-6 py-4">
    <a onClick={()=>changeStatus(data._id)}  className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">{data.status?'Reject':'Approve'}</a>
  </td>
</tr>

))}

</tbody>
</table>

</div>

    </div>
  )
}

export default JobsTable

