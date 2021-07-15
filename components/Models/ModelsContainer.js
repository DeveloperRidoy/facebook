import { useGlobalContext } from "../../context/GlobalContext"
import { CREATE_ACCOUNT, CREATE_POST, DETAILS } from "../../utils/client/variables";
import CreatePostModel from "./CreatePostModel/CreatePostModel";
import CreateAccountModel from './CreateAccountModel';
import DetailsModel from "./DetailsModel/DetailsModel";

const ModelsContainer = () => {
    const [state, setState] = useGlobalContext();
    const closeModel = () => setState({ ...state, model: { ...state.model, show: false } });

    if (!state.model?.show) return;
    
    if (state.model.type === CREATE_POST) return <CreatePostModel closeModel={closeModel} />
    
    if (state.model.type === CREATE_ACCOUNT) return <CreateAccountModel closeModel={closeModel} />
    
    if(state.model.type === DETAILS) return <DetailsModel closeModel={closeModel}/>
}

export default ModelsContainer
  