import Spacer from "../../Spacer"
import Comments from './Comments';
import WriteComment from "./WriteComment";

const ExpandedContent = () => {
    return (
      <div className="px-3">
        <Spacer />
        <div className="mt-2">
          <WriteComment />
          <Comments />
        </div>
      </div>
    );
}

export default ExpandedContent
