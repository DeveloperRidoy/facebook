import { HOST_QA } from "../../../utils/client/variables"
import { BsArrowLeft } from 'react-icons/bs';
import QADiv from "./QADiv";

const HostQA = ({ toggleModel, setToggleModel, formData, setFormData }) => {


    return (
      <div
        className={`flex-1 ${toggleModel !== HOST_QA ? "h-0 opacity-0" : ""}`}
      >
        <div className="p-4 min-w-[250px] text-center text-xl font-semibold relative border-b-2 dark:border-b dark:border-b-gray-500">
          Host a Q&A
          <button
            className="absolute top-2.5 left-4 text-3xl text-gray-600 dark:text-white bg-gray-200 dark:bg-dark-400 rounded-full p-1 transition hover:bg-gray-300 dark:hover:bg-dark-300 active:outline-none transform hover:active:scale-95"
            onClick={() => setToggleModel(null)}
          >
            <BsArrowLeft />
          </button>
        </div>
        <div className="p-4">
          <QADiv formData={formData} setFormData={setFormData} setToggleModel={setToggleModel}/>
        </div>
      </div>
    );
}

export default HostQA

