import { useEffect, useState } from "react"
import { fetchNotification } from "../../../api/UserApi"

function Notifications() {

const [notifications,setNotifications] = useState([])

	useEffect(()=>{
		fetchNotification().then((res)=>setNotifications(res.data.notifications))
	},[])

  return (
    <div className="px-40">
	<div>
	<h2 className="text-2xl font-light text-gray-700">Notifications</h2>
	<hr className="mb-3 bg-black"/>
	</div>
	<div className=" flex-col space-y-4  animated fadeIn faster w-full   left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
	{notifications.map((data,index)=>(
			<div key={index} className="flex flex-col p-3 bg-slate-300 shadow-md hover:shodow-lg rounded-2xl w-full">
				<div className="flex items-center justify-between ">
					<div className="flex items-center">
					
			<img className="w-16 h-16 rounded-2xl border border-gray-800 text-blue-400 bg-gray-900" src={data.image} alt="" />

				<div className="flex flex-col ml-3">
					<div className={`font-medium leading-none ${data.status === 'accepted'? 'text-green-500' : 'text-red-500'} `}>Your application has been {data.status}  </div>
					<p className="text-sm text-gray-600 leading-none mt-1">{data.categoryName} in {data.companyName}
					</p>
				</div>
			</div>
		</div>
	</div>))}
	</div>
    </div>
  )
}

export default Notifications