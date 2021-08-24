import axios from "axios";
import { useState } from "react"
import { FaGlobeAsia } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";
import catchAsync from "../../../utils/client/functions/catchAsync";
import Button from '../../Buttons/Button';
import Spacer from "../../Spacer";

const limit = 101;
const Bio = ({user, ownProfile}) => {
    const [state, setState] = useGlobalContext();
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState({ text: user?.bio || '', charactersLeft: limit - user?.bio?.length || 0});  
    
    const updateBio = (e) => catchAsync(async () => {
        e.preventDefault()
        setLoading(true);
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API || 'api'}/v1/users`, { bio: data.text }, { withCredentials: true });
        
        setState({ ...state, user: res.data.data?.user || state.user, alert: { show: true, text: 'bio updated' } });
        setExpand(false)
        setLoading(false);
    }, setState, () => setLoading(false));
    
    return (
      <div>
        {expand ? (
          <form onSubmit={updateBio}>
            <textarea
              rows="3"
              placeholder="Describe who you are"
              className="w-full p-2 rounded-lg text-center bg-white/0 dark:hover:bg-dark-400 border border-blue-500 focus:outline-none resize-none"
              onChange={(e) =>
                e.target.value.length <= limit &&
                setData({
                  text: e.target.value,
                  charactersLeft: limit - e.target.value.length,
                })
              }
              value={data.text}
            ></textarea>
            <div className="flex items-end justify-between dark:text-gray-400">
              <div className="flex gap-x-1 items-center">
                <FaGlobeAsia className="text-xl" />
                <span>Public</span>
              </div>
              <div className="flex flex-col items-end">
                <span>{data.charactersLeft} characters remaining</span>
                <div className="flex gap-x-2">
                  <button
                    type="button"
                    className="px-2 py-1.5 rounded-md dark:bg-dark-400 dark:text-white transition hover:brightness-125"
                    onClick={() => setExpand(false)}
                  >
                    Cancel
                  </button>
                  <Button
                    loading={loading}
                    className="px-2 py-1.5 rounded-md hover:brightness-125 disabled:hover:brightness-100 dark:bg-dark-400 dark:text-white dark:disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={!data.text || data.text === state.user?.bio}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div>
            {ownProfile && state.user?.bio
               ? (
                <div>
                  <p className="text-center">{state.user?.bio}</p>
                  <Spacer className="my-3" />
                </div>
              )
             :(
                user?.bio && (
                  <div>
                    <p className="text-center">{state.user?.bio}</p>
                    <Spacer className="my-3" />
                  </div>
                )
              )}
            {ownProfile && (
              <button
                className="w-full capitalize font-semibold bg-dark-400 rounded-md p-1.5 hover:brightness-125 transition active:scale-95"
                onClick={() => setExpand(true)}
              >
                {state.user?.bio ? "edit" : "add"} bio
              </button>
            )}
          </div>
        )}
      </div>
    );
}

export default Bio
