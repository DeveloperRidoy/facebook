import { HOST_QA } from "../../../utils/variables"
import { BsArrowLeft } from 'react-icons/bs';
import QADiv from "./QADiv";

const HostQA = ({ toggleModel, setToggleModel, formData, setFormData }) => {


    return (
      <div
        className={`flex-1 ${toggleModel !== HOST_QA ? "h-0 opacity-0" : ""}`}
      >
        <div className="p-4 min-w-[250px] text-center text-xl font-semibold relative border-b-2">
          Host a Q&A
          <button
            className="absolute top-2.5 left-4 text-3xl text-gray-600 bg-gray-200 rounded-full p-1 transition hover:bg-gray-300 active:outline-none transform hover:active:scale-95"
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

