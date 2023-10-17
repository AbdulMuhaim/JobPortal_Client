import { useLocation, useNavigate } from "react-router";
import { fetchJobDetails} from "../../../api/UserApi";
import { useEffect, useState } from "react";
import { initializeChat } from "../../../api/UserApi";

function JobDetails() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState([]);

  const createChat = (id) => {
    initializeChat(id)
      .then(() => {
        navigate("/chat");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchJobDetails(state.jobId).then((res) => {
      setJobDetails(res.data.jobDetails)
    });
  }, []);

  return (
    <div >



    <div className="items-center justify-center ">
      <div className="flex items-center justify-center p-20 bg-slate-200 shadow shadow-black border-black">
        <div className="">
          <div className="flex gap-5">
            <img
              className="h-64 w-72"
              src={jobDetails.image}
              alt=""
            />
            <div >
              <p className="font-extrabold text-4xl mt-12">{jobDetails.companyName}</p>
              <p className="font-semibold">{jobDetails.categoryName}</p>

              <div className="flex gap-4">
                <p className="opacity-75">{jobDetails.country}</p>
                <p className="opacity-75">{jobDetails.workingTime}</p>
              </div>
              <br />
              <div className="flex items-center justify-center">
                <button
                  onClick={() => createChat(state.jobId)}
                  className="btn bg-blue-700 mx-2 my-2 rounded-lg px-5 text-white text-xs p-2"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" text-center p-10 bg-slate-100">
        <p className="font-bold">Job Description</p>
        <p>
        {jobDetails.description}
        </p>
        <br />
        <div className="w-full flex gap-32">
          <div className="w-1/2 border">
            <p className="text-base font-bold bg-slate-300">Experience</p>
            <p className="whitespace-normal break-words bg-slate-200">
            {jobDetails.experience}
            </p>
          </div>

          <div className="w-1/2 border">
            <p className="text-base font-bold bg-slate-300">Skills</p>
            <p className="whitespace-normal break-words bg-slate-200">
            {jobDetails.skills}
            </p>
          </div>
        </div>
        <br />
        <div className="w-full flex gap-32">
          <div className="w-1/2 border">
            <p className="text-base font-bold bg-slate-300">Qualification</p>
            <p className="whitespace-normal break-words bg-slate-200">
            {jobDetails.qualifications}
            </p>
          </div>

          <div className="w-1/2 border">
            <p className="text-base font-bold bg-slate-300">Email</p>
            <p className="whitespace-normal break-words bg-slate-200">
            {jobDetails.email}
            </p>
          </div>
        </div>
        <br />
        <div className="flex gap justify-center items-center gap-5">
          <p className="font-bold">Address</p>
          <div className="flex gap justify-center items-center gap-1">
          <p>{jobDetails.country},</p>
          <p>{jobDetails.state},</p>
          <p>{jobDetails.city},</p>
          <p>{jobDetails.street}</p>
          <p>{jobDetails.zip}</p>
          </div>
        </div>
      </div>
    </div>



    </div>
  );
}

export default JobDetails;
