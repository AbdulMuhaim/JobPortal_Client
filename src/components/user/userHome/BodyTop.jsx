import {  useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../../images/logo.png"


const stats = [
  { name: "Offices worldwide", value: "12" },
  { name: "Jobs", value: "500+" },
  { name: "Employers", value: "100+" },
  { name: "Success stories", value: "1000+" },
];

export default function HomePageHeader() {       

  const userName = useSelector((state) => state.User.name);
  const [searchValue,setSearchValue] = useState('')
  const navigate = useNavigate()

  const jobSearch = ()=> {
    searchValue ? navigate('/jobs',{state:{searchValue}}) : null
  }

  const handleNavigation = () => {
    navigate('/jobs');
  };



  return (
    <>
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="w-full absolute h-auto bg-transparent top-0 flex justify-end px-6 pt-8 gap-5">

        {userName?<div>
          <p className="text-white">Welcome</p>
          <p className="text-white">{userName}</p>
        </div>: <div className="flex place-items-end justify-center cursor-pointer"><p onClick={()=>navigate('/login')} className="text-white underline">Login</p></div> }

        <a className="text-white ">
          <span>
            <img
              className="w-10 h-10"
              src={logo}
              alt=""
            />
          </span>
          MYJOB
        </a>
      </div>
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Find your dream job with us
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover your perfect career opportunity through our comprehensive
            JobPortal. Uncover a world of possibilities as we connect you with a
            wide range of employment options, enabling you to take a step closer
            to realizing your professional aspirations.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10 items-center justify-center">
              <a className="font-medium animate-bounce"
                onClick={handleNavigation}
                style={{ cursor: "pointer" }}
              >
              Explore MYJOB <span aria-hidden="true">&rarr;</span>
              </a>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 ">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse animate-pulse">
                <dt className="text-base leading-7 text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <br />
        <br />
      

        <div className="flex w-full items-center justify-center">
          <div className="w-1/2 p-4 rounded-lg flex  ">
            <input
              onChange={(e)=> setSearchValue(e.target.value)}
              id="search"
              name="search"
              type="string"
              className="flex-auto w-20 rounded-md border-0 h-11 bg-white/5 px-3 py-2 text-white text-center shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Search Here"
            />
            <button
              type="submit"
              onClick={jobSearch}
              className="flex-none rounded-md bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Search
            </button>
          </div>
        </div> 


      </div>
    </div>
    
  </>
  );
}
