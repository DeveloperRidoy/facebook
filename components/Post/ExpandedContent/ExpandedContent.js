import { useGlobalContext } from "../../../context/GlobalContext";
import Spacer from "../../Spacer"
import { usePostContext } from "../Post";
import Comments from './Comments';
import WriteComment from "./WriteComment";

const ExpandedContent = () => {
  const [state] = usePostContext();
    return (
      <div className="px-3">
        <Spacer />
        <div className="mt-2">
          <WriteComment/>
          {state.post.comments?.length > 0 && <Comments key={state.post.comments?.length}/>}
        </div>
      </div>
    );
}

export default ExpandedContent
