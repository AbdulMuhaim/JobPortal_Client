import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

import { useEffect, useState } from 'react'
import { fetchJobs } from '../../../api/EmployerApi';
import { fetchCategories } from '../../../api/AdminApi';

function Body() {

  const [allJobs,setAllJobs] = useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [search,setSearch] = useState('')
  const [fetchedJobs,setFetchedJobs] = useState([])
  const filterItems = (data) => {
    const newData = allJobs.filter((jobs)=> jobs.categoryName === data || jobs.country === data || jobs.workingTime === data || jobs.experience === data)
    setAllJobs(newData)
  }
  const clearAllFilter = ()=> {
    setAllJobs(fetchedJobs)
  }

  useEffect(() => {
  
    fetchJobs()
    .then((res) => {
      const filteredJobs = res.data.jobs.filter((job) => job.status === true);
      setFetchedJobs(filteredJobs)
      setAllJobs(filteredJobs)
    })
    .catch((jobsErr) => {
      console.error('Error fetching jobs:', jobsErr);
    });

    fetchCategories()
      .then((res) => {
        setAllCategories(res.data.categories);
      })
      .catch((categoriesErr) => {
        console.error('Error fetching categories:', categoriesErr);
      });
  }, []);
  


  return (
    <div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white">
    <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
        max-w-7xl">
      <div className="flex flex-col items-center sm:px-5 md:flex-row">
        <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
          <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
              md:space-y-5">
            <div className="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
                uppercase Inline-block">
              <p className="inline">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                    00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                    1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                    0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </p>
              <p className="inline text-xs font-medium">MyJob</p>
            </div>
            <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">Your Perfect Job Seeking Partner</a>

          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="block">
            <img 
                src="https://i.pinimg.com/564x/50/99/40/50994054f058099f9aa009549bbcf0b4.jpg" className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"/>
          </div>
        </div>
      </div>


      <div className="relative isolate overflow-hidden  bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-full px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Thank you for choosing MYJOB for your job search.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
            Start exploring and take the next step towards your dream career today!".
            </p>
            
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-400">
"A good job pays enough to cover the bills and basic needs. A good job makes it possible to achieve a balance between work life and home life. A good job motivates an employee to want to do it well. A positive company culture is indicative of a good job environment, which is a strong indicator of a good job".              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
              Our dedicated team works tirelessly to maintain the highest standards of quality and authenticity, so you can confidently explore and apply for jobs without worrying about scams or spam.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
<br />
<br />

<div className='flex justify-end'>
<button
onClick={clearAllFilter}
  type="submit"
   className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
    Clear All Filter
  </button>
  </div>

<div className=" flex h-10 w-full items-center gap-x-4">
  
        <div className='flex w-1/2'>
           
              <input
                onChange={(e)=> setSearch(e.target.value)}
                id="search"
                name="search"
                type="string"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Search Jobs"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Search
              </button>
          </div>

          <div className='flex w-1/2 gap-5'>

              <div className="sm:col-span-3  w-1/4 ">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select 
                  id="category"
                  name="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value)}
                >
                 <option value=""></option>
                    {allCategories.map((data)=>(
                  <option value={data.categoryName} key={data.categoryName}>{data.categoryName}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3  w-1/4">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <select
                  id="location"
                  name="location"
                  autoComplete="location"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value)}
                >
                  <option value=""></option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>India</option>
              
                </select>
              </div>
            </div>


            <div className="sm:col-span-3 w-1/4">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Experience 
              </label>
              <div className="mt-2">
                <select
                  id="experience"
                  name="experience"
                  autoComplete="experience-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value)}
                >
                  <option value=""></option>
                  <option>Fresher</option>
                  <option>1 Year+</option>
                  <option>2 Year+</option>
                  <option>3 Year+</option>
                  <option>4 Year+</option>
                  <option>5 Year+</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3 w-1/4">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Working Hour
              </label>
              <div className="mt-2">
                <select
                  id="workingHour"
                  name="workingHour"
                  autoComplete="workingHour"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value)}
                >
                  <option value=""></option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                </select>
              </div>
              </div>

            </div>

            </div>


            
      <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">

       {allJobs.filter((item)=>{
        return search.toLowerCase() === ''? item : item.companyName.toLowerCase().includes(search) || item.categoryName.toLowerCase().includes(search)})
        .map((data,index)=>(
<div key={index} className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
          <img className='w-20 h-20 rounded-full'
              src={data.image}/>
          <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3
              rounded-full uppercase Inline-block cursor-pointer">Apply Now</p>
          <a className="text-lg font-bold sm:text-xl md:text-2xl">{data.categoryName}</a>
          <p className='font-semibold'>{data.companyName}</p>
          <p className="text-sm text-black">{data.description}</p>
          <div className="pt-2 pr-0 pb-0 pl-0">
            <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">{data.experience}</a>
            <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
            <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
          </div>
        </div>

       ))}
        

      </div>
    </div>
  </div>
  )
}

export default Body

