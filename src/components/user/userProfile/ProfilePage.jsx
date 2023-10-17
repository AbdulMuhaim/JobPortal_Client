import { useEffect, useState } from "react";
import {
  fetchProfileData,
  profileData,
  removeProfileData,
} from "../../../api/UserApi";
import axios from "axios";
import editIcon from "../../../images/Ellipse.png";
import removeIcon from "../../../images/remove2.png";
import deleteIcon from "../../../images/remove1.png";
import toast from "react-hot-toast";

function ProfilePage() {
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedLanguages, setFetchedLanguages] = useState([]);
  const [fetchedSkills, setFetchedSkills] = useState([]);
  const [fetchedExperiences, setFetchedExperiences] = useState([]);
  const [fetchedEducation, setFetchedEducation] = useState([]);

  const [deleteEducation, setDeleteEducation] = useState(false);
  const [deleteExperience, setDeleteExperience] = useState(false);
  const [deleteLanguage, setDeleteLanguage] = useState(false);
  const [deleteSkill, setDeleteSkill] = useState(false);

  useEffect(() => {
    fetchProfileData()
      .then((res) => {
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

  const [languageValue, setLanguageValue] = useState("");
  const [skillValue, setSkillValue] = useState("");

  const [experienceValue, setExperienceValue] = useState({
    image: null,
    companyName: "",
    experience: "",
  });
  const [educationValue, setEducationValue] = useState({
    institution: "",
    field: "",
    year: "",
  });
  const [basicInfoValue, setBasicInfoValue] = useState({
    age: "",
    totalExperience: "",
    state: "",
    country: "",
    maritalStatus: "",
    cv:null
  });
  const [profilePicValue, setProfilePicValue] = useState({
    image: null,
    name: "",
    profession: "",
    about: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(false);
  const [skill, setSkill] = useState(false);
  const [experience, setExperience] = useState(false);
  const [education, setEducation] = useState(false);
  const [basicInfo, setBasicInfo] = useState(false);
  const [profilePic, setProfilePic] = useState(false);

  const languageModal = () => {
    setIsOpen(true);
    setLanguage(true);
    setLanguageValue("");
  };

  const skillModal = () => {
    setIsOpen(true);
    setSkill(true);
    setSkillValue("");
  };

  const basicInfoModal = () => {
    setIsOpen(true);
    setBasicInfo(true);
    setBasicInfoValue("");
  };

  const experienceModal = () => {
    setIsOpen(true);
    setExperience(true);
    setExperienceValue("");
  };

  const educationModal = () => {
    setIsOpen(true);
    setEducation(true);
    setEducationValue("");
  };

  const profilePicModal = () => {
    setIsOpen(true);
    setProfilePic(true);
    setProfilePicValue("");
  };


  const closeModal = () => {
    setIsOpen(false);
    setLanguage(false);
    setSkill(false);
    setBasicInfo(false);
    setExperience(false);
    setEducation(false);
    setProfilePic(false)
  };

  const submitModal = async () => {
    if (language) {
      setFetchedLanguages([...fetchedLanguages, languageValue]);
      profileData({ languageValue });
    }
    if (skill) {
      setFetchedSkills([...fetchedSkills, skillValue]);
      profileData({ skillValue });
    }
    if (education) {
      setFetchedEducation([...fetchedEducation, educationValue]);
      profileData({ educationValue });
    }
    if (basicInfo) {
      let cvUrl;

      if(basicInfoValue.cv){
      const cv = basicInfoValue.cv;
      const cloudName = "df625ktpb";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();
      formData.append("file", cv);
      formData.append("upload_preset", "JobPortal");
      const response = await axios.post(url, formData);
      cvUrl = response.data.secure_url;
      }
      const updatedUserData = {
        ...fetchedUserData,
        age: basicInfoValue.age || fetchedUserData.age,
        totalExperience:
          basicInfoValue.totalExperience || fetchedUserData.totalExperience,
        maritalStatus:
          basicInfoValue.maritalStatus || fetchedUserData.maritalStatus,
        state: basicInfoValue.state || fetchedUserData.state,
        country: basicInfoValue.country || fetchedUserData.country,
        cv:cvUrl || fetchedUserData.cv
      };
      setFetchedUserData(updatedUserData);
      profileData({ updatedUserData });
    }
    if (experience) {
      companyImage(experienceValue);
    }
    if (profilePic) {
      userImage(profilePicValue);
    }
  
    setIsOpen(false);
    setLanguage(false);
    setSkill(false);
    setBasicInfo(false);
    setExperience(false);
    setEducation(false);
    setProfilePic(false);
  };

  const companyImage = async (experienceValue) => {
    if (experienceValue.image) {
      const image = experienceValue.image;
      const cloudName = "df625ktpb";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "JobPortal");
      console.log(formData,'aaa');
      const response = await axios.post(url, formData);
      const imageUrl = response.data.secure_url;
      experienceValue.image = imageUrl;
      setFetchedExperiences([...fetchedExperiences, experienceValue]);
      profileData({ experienceValue, imageUrl });
    } else {
      setFetchedExperiences([...fetchedExperiences, experienceValue]);
      profileData({ experienceValue });
    }
  };



  const userImage = async (profilePicValue) => {
    if (profilePicValue.image) {
      const image = profilePicValue.image;
      const cloudName = "df625ktpb";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "JobPortal");
      const response = await axios.post(url, formData);
      const imageUrl = response.data.secure_url;

      const updateProfilePic = {
        ...fetchedUserData,
        name: profilePicValue.name || fetchedUserData.name,
        profession: profilePicValue.profession || fetchedUserData.profession,
        about: profilePicValue.about || fetchedUserData.about,
        image: imageUrl || fetchedUserData.image,
      };

      setFetchedUserData(updateProfilePic);
      profileData({ profilePicValue, imageUrl });
    } else {
      const updateProfilePic = {
        ...fetchedUserData,
        name: profilePicValue.name || fetchedUserData.name,
        profession: profilePicValue.profession || fetchedUserData.profession,
        about: profilePicValue.about || fetchedUserData.about,
      };
      setFetchedUserData(updateProfilePic);
      profileData({ profilePicValue });
    }
  };

  const removeData = ({ data, role }) => {
    if (role === "language") {
      const updatedState = fetchedLanguages.filter(
        (language) => language !== data
      );
      setFetchedLanguages(updatedState);
      removeProfileData(data, role);
    }
    if (role === "skill") {
      const updatedState = fetchedSkills.filter((skill) => skill !== data);
      setFetchedSkills(updatedState);
      removeProfileData(data, role);
    }
    if (role === "experience") {
      const updatedState = fetchedExperiences.filter(
        (experience) => experience !== data
      );
      setFetchedExperiences(updatedState);
      removeProfileData(data, role);
    }
    if (role === "education") {
      const updatedState = fetchedEducation.filter(
        (education) => education !== data
      );
      setFetchedEducation(updatedState);
      removeProfileData(data, role);
    }
  };

  return (
    <>
      {/* Main modal */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-400">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8 gap-5">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  MYJOB
                </h3>
                {language && (
                  <form className="space-y-6">
                    <input
                      onChange={(e) => setLanguageValue(e.target.value)}
                      value={languageValue}
                      type="text"
                      placeholder="add language here"
                      className="w-full"
                    />
                  </form>
                )}

                {skill && (
                  <form className="space-y-6">
                    <input
                      onChange={(e) => setSkillValue(e.target.value)}
                      value={skillValue}
                      type="text"
                      placeholder="add skill here"
                      className="w-full"
                    />
                  </form>
                )}

                {basicInfo && (
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="age"
                      className="w-full"
                      value={basicInfoValue.age}
                      onChange={(e) =>
                        setBasicInfoValue({
                          ...basicInfoValue,
                          age: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="years of experience"
                      className="w-full"
                      value={basicInfoValue.totalExperience}
                      onChange={(e) =>
                        setBasicInfoValue({
                          ...basicInfoValue,
                          totalExperience: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="state"
                      className="w-full"
                      value={basicInfoValue.state}
                      onChange={(e) =>
                        setBasicInfoValue({
                          ...basicInfoValue,
                          state: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="country"
                      className="w-full"
                      value={basicInfoValue.country}
                      onChange={(e) =>
                        setBasicInfoValue({
                          ...basicInfoValue,
                          country: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="marital status"
                      className="w-full"
                      value={basicInfoValue.maritalStatus}
                      onChange={(e) =>
                        setBasicInfoValue({
                          ...basicInfoValue,
                          maritalStatus: e.target.value,
                        })
                      }
                    />
                    <br />
                    <br />
        <span ><p className="opacity-90 text-base font-normal text-white">Drop your CV here</p><input
                      type="file"
                      placeholder="cv"
                      className="w-full"
                      onChange={(e) =>
                        setBasicInfoValue({
                          ...basicInfoValue,
                          cv: e.target.files[0],
                        })
                      }
                    /></span>

                  </form>
                )}

                {experience && (
                  <form className="space-y-6">
                    <input
                      type="file"
                      className="w-full"
                      onChange={(e) =>
                        setExperienceValue({
                          ...experienceValue,
                          image: e.target.files[0],
                        })
                      }
                    />
                    {experienceValue.image && (
                      <div>
                        <h2>Selected Image:</h2>
                        <img
                          src={URL.createObjectURL(experienceValue.image)}
                          alt="Selected"
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="company name"
                      className="w-full"
                      value={experienceValue.companyName}
                      onChange={(e) =>
                        setExperienceValue({
                          ...experienceValue,
                          companyName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="years of experience"
                      className="w-full"
                      value={experienceValue.experience}
                      onChange={(e) =>
                        setExperienceValue({
                          ...experienceValue,
                          experience: e.target.value,
                        })
                      }
                    />{" "}
                  </form>
                )}

                {education && (
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="institution"
                      className="w-full"
                      value={educationValue.institution}
                      onChange={(e) =>
                        setEducationValue({
                          ...educationValue,
                          institution: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="field of study"
                      className="w-full"
                      value={educationValue.field}
                      onChange={(e) =>
                        setEducationValue({
                          ...educationValue,
                          field: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="year of passout"
                      className="w-full"
                      value={educationValue.year}
                      onChange={(e) =>
                        setEducationValue({
                          ...educationValue,
                          year: e.target.value,
                        })
                      }
                    />
                  </form>
                )}


                {profilePic && (
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="name"
                      className="w-full"
                      value={profilePicValue.name}
                      onChange={(e) =>
                        setProfilePicValue({
                          ...profilePicValue,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="profession"
                      className="w-full"
                      value={profilePicValue.profession}
                      onChange={(e) =>
                        setProfilePicValue({
                          ...profilePicValue,
                          profession: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="about"
                      className="w-full"
                      value={profilePicValue.year}
                      onChange={(e) =>
                        setProfilePicValue({
                          ...profilePicValue,
                          about: e.target.value,
                        })
                      }
                    />
                    <input
                      type="file"
                      className="w-full"
                      onChange={(e) =>
                        setProfilePicValue({
                          ...profilePicValue,
                          image: e.target.files[0],
                        })
                      }
                    />
                    {profilePicValue.image && (
                      <div>
                        <h2>Selected Image:</h2>
                        <img
                          src={URL.createObjectURL(profilePicValue.image)}
                          alt="Selected"
                        />
                      </div>
                    )}
                  </form>
                )}

                <br />

                <button
                  onClick={submitModal}
                  className="btn bg-blue-700  rounded-lg px-3 text-white text-xs py-1 "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* modal closed */}

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
                <div onClick={profilePicModal} className="flex cursor-pointer">
                  <img className="w-6 h-6 " src={editIcon} alt="" />
                  <p>edit</p>
                </div>

                <h1 className="text-lg font-bold">{fetchedUserData.name}</h1>
                <h1 className="text-sm opacity-80 font-semibold">
                  {fetchedUserData.profession}
                </h1>
                <p className="text-xs text-center ">{fetchedUserData.about}</p>
              </div>

              <div className="my-4 flex justify-between">
                <h1 className="md:text-lg text-sm mx-2 font-bold">Languages</h1>
                <div className="flex justify-center items-center">
                  <button
                    onClick={languageModal}
                    className="btn bg-blue-700  rounded-lg px-1 md:px-3 text-white text-xs py-1 "
                  >
                    Add Language +
                  </button>
                  <img
                    onClick={() => setDeleteLanguage(!deleteLanguage)}
                    className="w-5 h-5 cursor-pointer"
                    src={editIcon}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex">
                {fetchedLanguages.map((data, index) => (
                  <div key={index} className="flex">
                    <button className="btn bg-green-500 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 ">
                      {deleteLanguage && (
                        <span>
                          <div className="flex items-end justify-end">
                            <img
                              onClick={() =>
                                removeData({ data, role: "language" })
                              }
                              className="w-3 h-3"
                              src={removeIcon}
                              alt=""
                            />
                          </div>
                        </span>
                      )}

                      {data}
                    </button>
                  </div>
                ))}
              </div>

              <div className="my-4 flex justify-between">
                <h1 className="text-lg font-bold">Skills</h1>
                <div className="flex justify-center items-center">
                  <button
                    onClick={skillModal}
                    className="btn bg-blue-700  rounded-lg px-3 text-white text-xs py-1 "
                  >
                    Add a Skill +
                  </button>
                  <img
                    onClick={() => setDeleteSkill(!deleteSkill)}
                    className="w-5 h-5 cursor-pointer"
                    src={editIcon}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex">
                {fetchedSkills.map((data, index) => (
                  <div key={index} className="flex">
                    <button className="btn bg-yellow-400 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 ">
                      {deleteSkill && (
                        <span>
                          <div className="flex items-end justify-end ">
                            <img
                              onClick={() =>
                                removeData({ data, role: "skill" })
                              }
                              className="w-3 h-3"
                              src={removeIcon}
                              alt=""
                            />
                          </div>
                        </span>
                      )}
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
                <button
                  onClick={basicInfoModal}
                  className="btn bg-blue-500 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 "
                >
                  Edit Profile
                </button>
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
                <button className="btn bg-green-600 mx-2 my-2 rounded-lg px-5 text-white text-xs p-2 ">
                  Download Resume
                </button>
              </div>
            </div>

            <div className="w-full h-auto bg-white rounded-lg mt-10">
              <div className="flex justify-between px-5 pt-3">
                <h2 className="text-lg font-extrabold ">Experience</h2>
                <div className="flex justify-center items-center">
                  <button
                    onClick={experienceModal}
                    className="btn bg-blue-500 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 "
                  >
                    Add Experience+
                  </button>
                  <span>
                    <img
                      onClick={() => setDeleteExperience(!deleteExperience)}
                      className="w-5 h-5 cursor-pointer"
                      src={editIcon}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div>
                <div className="w-full h-full px-8 flex justify-between p-2 ">
                  {fetchedExperiences.map((data, index) => (
                    <div key={index} className="h-1/3">
                      <div className="flex items-end justify-end">
                        {deleteExperience && (
                          <img
                            onClick={() =>
                              removeData({ data, role: "experience" })
                            }
                            className="w-5 h-5 cursor-pointer"
                            src={deleteIcon}
                            alt=""
                          />
                        )}
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
                <button className="btn bg-sky-500 mx-2 my-2 rounded-lg px-5 text-white text-xs p-2 ">
                  Favourite Jobs
                </button>
                <br />
                <button className="btn bg-sky-500 mx-2 my-2 rounded-lg px-5 text-white text-xs p-2 ">
                  Applied Jobs
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 p-8">
            <div className="w-full  bg-white rounded-lg">
              <div className="flex justify-between px-5 pt-3">
                <h2 className="text-lg font-extrabold ">Education</h2>
                <div className="flex justify-center items-center">
                  <button
                    onClick={educationModal}
                    className="btn bg-blue-600 mx-2 my-2 rounded-lg px-3 text-white text-xs py-1 "
                  >
                    Add Education+
                  </button>
                  <span>
                    <img
                      onClick={() => setDeleteEducation(!deleteEducation)}
                      className="w-5 h-5 cursor-pointer"
                      src={editIcon}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div>
                <div className="w-full  px-8  md:flex justify-between p-2">
                  <div className="">
                    <p className="font-semibold opacity-75">Institution</p>
                    {fetchedEducation.map((data, index) => (
                      <div key={index} className="flex">
                        {deleteEducation && (
                          <img
                            onClick={() =>
                              removeData({ data, role: "education" })
                            }
                            className="w-5 h-5 cursor-pointer"
                            src={deleteIcon}
                            alt=""
                          />
                        )}

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
    </>
  );
}

export default ProfilePage;
