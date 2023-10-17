import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { fetchJobs, jobApplication } from "../../../api/UserApi";
import { fetchCategories } from "../../../api/UserApi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import JobModal from "./JobModal";
import axios from "axios";

function Body() {
  const userName = useSelector((state) => state.User.name);
  const [allJobs, setAllJobs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [jobConfoModal, setJobConfoModal] = useState(false);
  const [jobId, setJobId] = useState("");
  const location = useLocation();
  const { state } = location;
  const [dataCount, setDataCount] = useState(0);
  const [filterData, setFilterData] = useState({});
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.User.id);

  useEffect(() => {
    if (state) {
      setSearch(state.searchValue);
      navigate(location.pathname, { replace: true });
    }
    return () => {
      setSearch("");
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (timer) {
      clearTimeout(timer);
    }
    setDataCount(0);
    const newTimer = setTimeout(() => {
      setSearch(value);
    }, 1000);
    setTimer(newTimer);
  };

  const filterItems = (data, type) => {
    setDataCount(0);
    if (type === "category")
      setFilterData((prev) => ({ ...prev, category: data }));
    if (type === "location")
      setFilterData((prev) => ({ ...prev, location: data }));
    if (type === "experience")
      setFilterData((prev) => ({ ...prev, experience: data }));
    if (type === "workingHour")
      setFilterData((prev) => ({ ...prev, workingHour: data }));
  };

  useEffect(() => {
    fetchJobs(dataCount, filterData, search)
      .then((res) => {
        setAllJobs(res.data.jobs);
      })
      .catch((jobsErr) => {
        console.error("Error fetching jobs:", jobsErr);
      });

    fetchCategories()
      .then((res) => {
        setAllCategories(res.data.categories);
      })
      .catch((categoriesErr) => {
        console.error("Error fetching categories:", categoriesErr);
      });
  }, [filterData, dataCount, search]);

  const applyJob = (id) => {
    setJobId(id);
    userName
      ? setJobConfoModal(true)
      : navigate("/login").catch((error) => {
          console.error("Error applying for the job:", error);
        });
  };

  const submitModal = async (cv, letter) => {
    let cvUrl;
    if (cv) {
      const cloudName = "df625ktpb";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append("file", cv);
      formData.append("upload_preset", "JobPortal");
      const response = await axios.post(url, formData);
      cvUrl = response.data.secure_url;
    }

    jobApplication(jobId, cvUrl, letter).then((res) => {
      const updatedJobs = allJobs.map((job) => {
        if (job._id === jobId && res.status === '200') {
          return {
            ...job,
            appliedEmployees: [...job.appliedEmployees, userId],
          };
        }
        return job;
      });
      setAllJobs(updatedJobs);
      setJobConfoModal(false);
    });
  };

  const jobDetails = (jobId) => {
    navigate("/jobDetails", { state: { jobId } });
  };

  const cancelModal = () => {
    setJobConfoModal(false);
  };

  const previous = () => {
    setDataCount(dataCount - 6);
  };

  const next = () => {
    setDataCount(dataCount + 6);
  };

  return (
    <div className="text-gray-900 pr-0 pb-14 pl-0 bg-white">
      <div
        className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
        max-w-7xl"
      >
        <div className="flex flex-col items-center sm:px-5 md:flex-row">
          <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
            <div
              className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
              md:space-y-5"
            >
              <div
                className="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
                uppercase Inline-block"
              >
                <p className="inline">
                  <svg
                    className="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                    00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                    1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                    0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </p>
                <p className="inline text-xs font-medium">MyJob</p>
              </div>
              <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">
                Your Perfect Job Seeking Partner
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="block">
              <img
                src="https://i.pinimg.com/564x/50/99/40/50994054f058099f9aa009549bbcf0b4.jpg"
                className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden  bg-gray-900 py-10 rounded-2xl">
          <div className="mx-auto max-w-full px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Thank you for choosing MYJOB for your job search.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Start exploring and take the next step towards your dream
                  career today!".
                </p>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <CalendarDaysIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="mt-4 font-semibold text-white">
                    Weekly articles
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    "A good job pays enough to cover the bills and basic needs.
                    A good job makes it possible to achieve a balance between
                    work life and home life. A good job motivates an employee to
                    want to do it well. A positive company culture is indicative
                    of a good job environment, which is a strong indicator of a
                    good job".{" "}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <HandRaisedIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="mt-4 font-semibold text-white">No spam</dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    Our dedicated team works tirelessly to maintain the highest
                    standards of quality and authenticity, so you can
                    confidently explore and apply for jobs without worrying
                    about scams or spam.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <br />

        <div className=" md:grid  md:grid-cols-6 w-full gap-x-4">
          <div className="flex col-span-2 py-4">
            <input
              onChange={handleInputChange}
              id="search"
              name="search"
              type="string"
              className="min-w-0 border flex-auto rounded-md bg-white/5 px-3.5 py-2 text-black  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Search Jobs"
            />
            <button
              type="submit"
              className="flex-none ml-1 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 md:col-span-4 ">
            <div className="col-span-1 ">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value, "category")}
                >
                  <option value=""></option>
                  {allCategories.map((data) => (
                    <option key={data.categoryName}>{data.categoryName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" col-span-1 ">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <select
                  id="location"
                  name="location"
                  autoComplete="location"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value, "location")}
                >
                  <option value=""></option>
                  {["United States", "Mexico", "India", "Canada"].map(
                    (value) => (
                      <option key={value}>{value}</option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Experience
              </label>
              <div className="mt-2">
                <select
                  id="experience"
                  name="experience"
                  autoComplete="experience-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value, "experience")}
                >
                  {" "}
                  <option value=""></option>
                  {["Fresher", "Year+", "Year+", "Year+", "Year+", "Year+"].map(
                    (value, index) => (
                      <option key={index}>
                        {index > 1 && index - 1 + " "}
                        {value}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="col-span-1 ">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Working Hour
              </label>
              <div className="mt-2">
                <select
                  id="workingHour"
                  name="workingHour"
                  autoComplete="workingHour"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => filterItems(e.target.value, "workingHour")}
                >
                  <option value=""></option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        { allJobs.length > 0 ? <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16 ">
          {allJobs.map((data, index) => (
            <div
              key={index + 1 * 2}
              className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 border shadow-xl px-7 py-2 rounded-lg group transition-transform transform-gpu scale-100 hover:scale-105 hover:shadow-md"
            >
              <img className="w-20 h-20 rounded-full" src={data.image} />
              {data.appliedEmployees.some((employee) => employee === userId) ? (
                <p className="bg-green-900 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase Inline-block cursor-pointer">
                  Applied
                </p>
              ) : (
                <p
                  onClick={() => applyJob(data._id)}
                  className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase Inline-block cursor-pointer"
                >
                  Apply Now
                </p>
              )}
              <a className="text-lg font-bold sm:text-xl md:text-2xl">
                {data.categoryName}
              </a>
              <p className="font-semibold">{data.companyName}</p>
              <p className="text-sm text-black break-words whitespace-normal w-full">
                {data.description}
              </p>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 ">
                  {data.experience}
                </a>
                <p
                  onClick={() => jobDetails(data._id)}
                  className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1 underline cursor-pointer"
                >
                  see more..{" "}
                </p>
              </div>
            </div>
          ))}
        </div>

        : <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500">
                !oops
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-gray-950">
                No results found.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find any data. You'll find lots to explore on
                the home page.
              </p>
              <a
                href="#"
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section> }

      </div>
      {jobConfoModal ? (
        <JobModal submitFunction={submitModal} cancelFunction={cancelModal} />
      ) : null}

      <div className="mt-10 flex justify-center">
        <div className="flex flex-row mx-auto ">
          {dataCount === 0 ? null : (
            <button
              onClick={() => previous()}
              type="button"
              className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-600 hover:text-white px-3"
            >
              <div className="flex flex-row align-middle">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
          )}

          {allJobs.length === 0 || allJobs.length < 6 ? null : (
            <button
              onClick={() => next()}
              type="button"
              className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-blue-600 hover:text-white px-3"
            >
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg
                  className="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
