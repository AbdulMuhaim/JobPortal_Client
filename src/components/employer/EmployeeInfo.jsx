import { useEffect, useState } from "react"
import { employeeInfo } from "../../api/EmployerApi";
import { useLocation, useNavigate } from "react-router";
import { initializeChat } from "../../api/EmployerApi";

function EmployeeInfo() {


  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate()

  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedLanguages, setFetchedLanguages] = useState([]);
  const [fetchedSkills, setFetchedSkills] = useState([]);
  const [fetchedExperiences, setFetchedExperiences] = useState([]);
  const [fetchedEducation, setFetchedEducation] = useState([]);

  useEffect(() => {
    employeeInfo(state.email).then((res) => {
        setFetchedLanguages(res.data.userData[0].languages);
        setFetchedSkills(res.data.userData[0].skills);
        setFetchedExperiences(res.data.userData[0].experience);
        setFetchedEducation(res.data.userData[0].education);
        setFetchedUserData(res.data.userData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    const downloadCV = (fileUrl,fileName) => {
      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.download = `${fileName}cv_file.pdf`;
      anchor.target = '_blank';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
  }


  const createChat = (id) => {
    initializeChat(id)
      .then(() => {
        navigate("/employer/chat");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto p-5 h-auto">
    <div className="md:grid grid-cols-1  md:grid-cols-5 gap-2 ">
      <div className="col-span-2 p-5">
        <div className="bg-white mx-auto h-full rounded-xl shadow-lg inset-0 py-5 px-10 md:px-16">
          <div className="w-full flex justify-end"></div>

          <div className="flex flex-col items-center  py-3 ">
            <img
              className="h-28 w-28 object-cover rounded-full"
              src={fetchedUserData.image}
              alt=""
            />
            <h1 className="text-lg font-bold">{fetchedUserData.name}</h1>
            <h1 className="text-sm opacity-80 font-semibold">
              {fetchedUserData.profession}
            </h1>
            <p className="text-xs text-center ">{fetchedUserData.about}</p>
          </div>

          <div className="my-4 flex justify-between">
            <h1 className="md:text-lg text-sm mx-2 font-bold">Languages</h1>
            <div className="flex justify-center items-center">
            
        
            </div>
          </div>
          <div className="flex">
            {fetchedLanguages.map((data, index) => (
              <div key={index} className="flex">
                <button className="btn bg-green-500 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 cursor-text">
                  {data}
                </button>
              </div>
            ))}
          </div>

          <div className="my-4 flex justify-between">
            <h1 className="text-lg font-bold">Skills</h1>
            <div className="flex justify-center items-center">
              
            </div>
          </div>
          <div className="flex">
            {fetchedSkills.map((data, index) => (
              <div key={index} className="flex">
                <button className="btn bg-yellow-400 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 cursor-text ">
                  {data}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3 p-8">
        <div className="w-full h-auto bg-white rounded-lg">
          <div className="flex justify-between px-5 pt-3">
            <h2 className="text-lg font-extrabold ">Basic Information</h2>
          </div>

          <div>
            <div className="w-full h-full px-8  md:flex justify-between p-2">
              <div className="h-1/3">
                <p className="font-semibold opacity-75">Email</p>
                <p className="font-bold ">{fetchedUserData.email}</p>
              </div>
              <div className="h-1/3">
                <p className="font-semibold opacity-75">Phone</p>
                <p className="font-bold">{fetchedUserData.mobile}</p>
              </div>

              <div className="h-1/3">
                <p className="font-semibold opacity-75">Age</p>
                <p className="font-bold">{fetchedUserData.age}</p>
              </div>
            </div>
            <div className="w-full h-full px-8  md:flex justify-between p-2">
              <div className="h-1/3">
                <p className="font-semibold opacity-75">
                  Years of expeirnce
                </p>
                <p className="font-bold">
                  {fetchedUserData.totalExperience}
                </p>
              </div>
              <div className="h-1/3">
                <p className="font-semibold opacity-75">Location</p>
                <p className="font-bold">
                  {fetchedUserData.state},{fetchedUserData.country}
                </p>
              </div>
              <div className="h-1/3">
                <p className="font-semibold opacity-75">Marital status</p>
                <p className="font-bold">{fetchedUserData.maritalStatus}</p>
              </div>
            </div>
          </div>

          <div className="flex p-3">
            <button onClick={()=>downloadCV(fetchedUserData.cv,fetchedUserData.name)} className="btn bg-green-600 mx-2 my-2 rounded-lg px-5 text-white text-xs p-2 ">
              Download Resume
            </button>
          </div>
        </div>

        <div className="w-full h-auto bg-white rounded-lg mt-10">
          <div className="flex justify-between px-5 pt-3">
            <h2 className="text-lg font-extrabold ">Experience</h2>
            <div className="flex justify-center items-center">
             
            </div>
          </div>
          <div>
            <div className="w-full h-full px-8 flex justify-between p-2 ">
              {fetchedExperiences.map((data, index) => (
                <div key={index} className="h-1/3">
                  <div className="flex items-end justify-end">
                  </div>
                  <img
                    className="h-10 w-10 object-cover rounded-full"
                    src={data.image}
                    alt=""
                  />
                  <p className="font-semibold opacity-75">
                    {data.companyName}
                  </p>
                  <p className="font-bold">{data.experience} Years</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="md:grid md:grid-cols-5 h-auto gap-2 ">
      <div className="md:col-span-2 p-5">
        <div className=" mx-auto rounded-xl  inset-0 py-5 px-16">
          <div className="flex flex-col items-center py-3 ">
            <button onClick={()=> (createChat(fetchedUserData._id))} className="btn bg-sky-600 mx-2 my-2 rounded-lg px-5 text-white text-xs p-2 ">
              Send Message
            </button>
            <br />
          </div>
        </div>
      </div>

      <div className="md:col-span-3 p-8">
        <div className="w-full  bg-white rounded-lg">
          <div className="flex justify-between px-5 pt-3">
            <h2 className="text-lg font-extrabold ">Education</h2>
            <div className="flex justify-center items-center">
             
            </div>
          </div>
          <div>
            <div className="w-full  px-8  md:flex justify-between p-2">
              <div className="">
                <p className="font-semibold opacity-75">Institution</p>
                {fetchedEducation.map((data, index) => (
                  <div key={index} className="flex">
                    <p className="font-bold">{data.institution}</p>
                  </div>
                ))}
              </div>

              <div className="">
                <p className="font-semibold opacity-75">Field of study</p>
                {fetchedEducation.map((data, index) => (
                  <p key={index} className="font-bold">
                    {data.field}
                  </p>
                ))}
              </div>

              <div className="">
                <p className="font-semibold opacity-75">Year</p>
                {fetchedEducation.map((data, index) => (
                  <p key={index} className="font-bold">
                    {data.year}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-72 md:h-0 text-black"></div>
    </div>
  </div>
  )
}

export default EmployeeInfo