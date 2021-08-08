import Model from "../Model"
import CreatePostForm from "./CreatePostForm";
import SelectAudience from "./SelectAudience";
import { ADD_TO_POST, AUDIENCE, HOST_QA, POST, PUBLIC } from "../../../utils/client/variables";
import AddToYourPost from "./AddToYourPost";
import HostQA from "./HostQA";
import { useState } from "react";


const CreatePostModel = ({closeModel}) => {

  const [toggleModel, setToggleModel] = useState(null);

  const [formData, setFormData] = useState({
    text: null,
    photos: [],
    videos: [],
    audience: PUBLIC,
    type: POST,
    qaText: "",
    qaBackground: "bg-gradient-to-br from-pink-500 to-blue-500",
    postBackground: "transparent"
  });

    return (
      <Model
        closeModel={closeModel}
      >
        <div
          className={`${
            toggleModel ? "w-[200%]" : ""
          } flex transform transition ${toggleModel && "-translate-x-1/2"}`}
        >
          <CreatePostForm
            toggleModel={toggleModel}
            closeModel={closeModel}
            setToggleModel={setToggleModel}
            formData={formData}
            setFormData={setFormData}
          />

          {toggleModel === AUDIENCE ? (
            <SelectAudience
              toggleModel={toggleModel}
              setToggleModel={setToggleModel}
              formData={formData}
              setFormData={setFormData}
            />
          ) : toggleModel === ADD_TO_POST ? (
            <AddToYourPost
              toggleModel={toggleModel}
              setToggleModel={setToggleModel}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            toggleModel === HOST_QA && (
              <HostQA
                toggleModel={toggleModel}
                setToggleModel={setToggleModel}
                formData={formData}
                setFormData={setFormData}
              />
            )
          )}
        </div>
      </Model>
    );
}

export default CreatePostModel
