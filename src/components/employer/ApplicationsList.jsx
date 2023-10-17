import { useEffect, useState } from "react"
import { applicationStatus, fetchApplications } from "../../api/EmployerApi"
import { useNavigate } from "react-router"



function ApplicationsList() {

  const [applications,setApplications] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    fetchApplications()
    .then((res)=> {
      setApplications(res.data.applications)
    }).catch((err)=> {
      console.log(err);
    })
  },[])

  const downloadCv = (fileUrl,fileName) => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = `${fileName}cv_file.pdf`;
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
};

const employeeInfo = (email)=> {
  navigate('/employer/employeeInfo',{state:{email}})
}

const appStatus = (appId, newStatus) => {
  applicationStatus(appId, newStatus); 
  const updatedApp = applications.map((app) =>app._id == appId ? { ...app,...newStatus } : app)
  setApplications(updatedApp)
};


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between py-4 bg-blue-900 dark:bg-gray-900 ">
    
    </div>



<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-6 py-3">
        S.No
      </th>
      <th scope="col" className="px-6 py-3">
        Title
      </th>
      <th scope="col" className="px-6 py-3">
        Company
      </th>
      <th scope="col" className="px-6 py-3">
        Employee
      </th>
      <th scope="col" className="px-6 py-3">
        CV
      </th>
      <th scope="col" className="px-6 py-3">
        Applied on
      </th>
      <th scope="col" className="px-6 py-3">
        Cover Letter</th>
      <th scope="col" className="px-6 py-3">
      </th>
      <th scope="col" className="px-6 py-3">
      </th>
    </tr>
  </thead>


  <tbody>
      {applications.map((data,index)=>(
        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1}</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">{data?.jobId?.categoryName}</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.jobId?.companyName}</td>
        <td onClick={()=>employeeInfo(data.employeeId.email)} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white underline cursor-pointer">{data?.employeeId?.name}</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
        <svg onClick={()=>downloadCv(data?.cv,data?.employeeId?.name)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path  strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      </td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(data?.date).toLocaleDateString()}</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.coverLetter}</td>
        


{data.status === 'pending' &&
  <>
    <td
      onClick={() => appStatus(data._id, { status: "accepted" })}
      className="px-6 py-4 font-medium text-yellow-50 cursor-pointer whitespace-nowrap dark:text-yellow-50"
    >
      Accept
    </td>
    <td
      onClick={() => appStatus(data._id, { status: "rejected" })}
      className="px-6 py-4 font-medium text-yellow-50 cursor-pointer whitespace-nowrap dark:text-yellow-50"
    >
      Reject
    </td>
  </>
  }

 {data.status === 'accepted' &&
  <>
    <td className="px-6 py-4 font-medium text-green-500 dark:text-green-500">
      Accepted
    </td>
    <td className="px-6 py-4 font-medium text-green-500 dark:text-green-500">
    </td>
  </>
  }

  {data.status === 'rejected' &&
  <>
    <td className="px-6 py-4 font-medium text-red-500 dark:text-red-500">
      Rejected
    </td>
    <td className="px-6 py-4 font-medium text-red-500 dark:text-red-500">
    </td>
  </>
  }
      </tr>  ))} 
  </tbody> 
</table>


  </div>
  )
}

export default ApplicationsList