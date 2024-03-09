import { CAROUSEL, CREATE_ACCOUNT, CREATE_POST, DETAILS, EMOJI } from "../../utils/client/variables";
import CreatePostModel from "./CreatePostModel/CreatePostModel";
import CreateAccountModel from './CreateAccountModel';
import DetailsModel from "./DetailsModel/DetailsModel";
import CarouselModel from "./CarouselModel";
import { useGlobalContext } from "../../context/GlobalContext";

const ModelsContainer = () => {
    const [state, setState] = useGlobalContext();
    const closeModel = () =>
      setState({ ...state, model: { ...state.model, show: false} });
   

    if (!state.model?.show) return;
    
    if (state.model.type === CREATE_POST) return <CreatePostModel closeModel={closeModel}/>
    
    if (state.model.type === CREATE_ACCOUNT) return <CreateAccountModel closeModel={closeModel} />;
    
    if (state.model.type === DETAILS) return <DetailsModel closeModel={closeModel} />;
    
  if (state.model.type === CAROUSEL) return <CarouselModel closeModel={closeModel} data={state.model.data} />;
}

export default ModelsContainer
  