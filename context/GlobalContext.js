import { createContext, useContext, useState } from "react"

const Context = createContext();
export const useGlobalContext = () => useContext(Context);
import CreatePostModel from '../components/Models/CreatePostModel/CreatePostModel';

const GlobalContext = ({ children }) => {
    const [state, setState] = useState({
        showCreatePostModel: false
    })
    
    return (
      <Context.Provider value={[state, setState]}>
        {state.showCreatePostModel && (
          <CreatePostModel closeModel={() => setState({...state, showCreatePostModel: false})} />
        )}
        {children}
      </Context.Provider>
    );
}

export default GlobalContext
