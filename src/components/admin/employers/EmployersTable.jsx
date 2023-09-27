import { useEffect, useState } from 'react'
import { employerStatus, fetchEmployers } from '../../../api/AdminApi'
import toast from 'react-hot-toast'


function EmployersTable() {

  const [employers,setFetchEmployers] = useState([])


  useEffect(()=>{
    fetchEmployers()
    .then((res)=>{
      setFetchEmployers(res.data.employers)
    }).catch((err)=>{
      console.log(err);
    })
  },[])


  const changeStatus = async(email)=>{
    const newData = employers.map((obj)=>obj.email===email ? {...obj,status : !obj.status} : obj)
    setFetchEmployers(newData)
    const response = await employerStatus(email)
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
          Employer name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Mobile
        </th>
        <th scope="col" className="px-6 py-3">
          status
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>


 

<tbody>

{employers.map((data,index)=>(

<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{index+1}
</td>
<td className="px-6 py-4">
{data.name}
</td>
<td className="px-6 py-4">
{data.email}
</td>
<td className="px-6 py-4">
{data.mobile}
</td>
<td className="px-6 py-4">
{data.status?'Active':'Blocked'}
</td>
<td className="px-6 py-4">
<a  onClick={()=>changeStatus(data.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">{data.status?'Block':'Unblock'}</a>
</td>
</tr>

))}

</tbody>
</table>

</div>
</div>
  )
}

export default  EmployersTable
