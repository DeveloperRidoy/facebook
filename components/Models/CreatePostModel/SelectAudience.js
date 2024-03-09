import { BsArrowLeft, BsToggleOff } from "react-icons/bs";
import { FaGlobeAsia, FaLock, FaUserFriends } from "react-icons/fa";
import { AUDIENCE, FRIENDS, ONLY_ME, PUBLIC } from "../../../utils/client/variables";



const SelectAudience = ({setToggleModel, toggleModel, setFormData, formData}) => {
    return (
      <div
        className={`flex-1 ${toggleModel !== AUDIENCE ? "h-0 opacity-0" : ""}`}
      >
        <div className="p-4 min-w-[250px] text-center text-xl font-semibold capitalize relative border-b-2 dark:border-b dark:border-gray-500">
          select audience
          <button
            className="absolute top-2.5 left-4 text-3xl text-gray-600 dark:text-white bg-gray-200 dark:bg-dark-400 rounded-full p-1 transition hover:bg-gray-300 dark:hover:bg-dark-300 active:outline-none transform hover:active:scale-95"
            onClick={() => setToggleModel(null)}
          >
            <BsArrowLeft />
          </button>
        </div>
        <div className="p-4 text-gray-600 font-semibold">
          <p className=" text-lg text-black dark:text-white">
            Who can see your post?
          </p>
          <p className="leading-5 dark:text-gray-300">
            Your post will show up in News Feed, on your profile and in search
            results.
          </p>
          <div className="max-h-[250px] overflow-auto mt-2">
            <AudienceItem
              heading="public"
              subHeading="Anyone on or off Facebook"
              value={PUBLIC}
              setFormData={setFormData}
              active={formData.audience === PUBLIC}
              setToggleModel={setToggleModel}
            >
              <FaGlobeAsia />
            </AudienceItem>
            <AudienceItem
              heading="friends"
              subHeading="Your friends on Facebook"
              value={FRIENDS}
              setFormData={setFormData}
              active={formData.audience === FRIENDS}
              setToggleModel={setToggleModel}
            >
              <FaUserFriends />
            </AudienceItem>
            <AudienceItem
              heading="only me"
              value={ONLY_ME}
              setFormData={setFormData}
              active={formData.audience === ONLY_ME}
              setToggleModel={setToggleModel}
            >
              <FaLock />
            </AudienceItem>
          </div>
        </div>
      </div>
    );
}

export default SelectAudience

const AudienceItem = ({ children, heading, subHeading, value, active, setFormData, setToggleModel }) => (
  <button
    className={`w-full flex gap-x-2 items-center p-2 transition hover:bg-gray-200 dark:hover:bg-dark-400 focus:bg-gray-300 dark:focus:bg-dark-600/40  rounded-lg focus:outline-none ${
      active ? "bg-secondary dark:bg-dark-400" : ""
      }`}
    onClick={() => { setFormData((prev) => ({ ...prev, audience: value })); setToggleModel(null) }}
  >
    <div className="p-5 rounded-full bg-indigo-100 transition text-2xl text-black">
      {children}
    </div>
    <div className="flex-1 flex flex-col items-start">
      <p className="text-lg text-black dark:text-white capitalize font-semibold">{heading}</p>
      <p className="dark:text-gray-300">{subHeading}</p>
    </div>
    <div className="flex items-center pr-3">
      <div className="h-4 w-4 flex justify-center items-center rounded-full border-2 border-blue-500">
        <div
          className={`h-2 w-2 rounded-full bg-blue-500 transform scale-0 ${
            active ? "scale-100" : ""
          }`}
        ></div>
      </div>
    </div>
  </button>
);
