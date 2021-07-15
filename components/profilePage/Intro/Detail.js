import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext"
import catchAsync from "../../../utils/client/functions/catchAsync";
import { DETAILS } from "../../../utils/client/variables";
import DetailsModel from "../../Models/DetailsModel/DetailsModel";

const Detail = () => {
    const [globalState, setGolbalState] = useGlobalContext();
    const [state, setState] = useState({ loading: false, edit: false, details: []}); 
    
    const editDetail = (e) => catchAsync(async () => {
        
    }, setGolbalState, () => setState({ ...state, loading: false }))
    
    return (
      <div> 
        <button className="w-full capitalize font-semibold bg-dark-400 rounded-md p-1.5 hover:brightness-125 transition active:scale-95" onClick={() => setGolbalState({...globalState, model: {show: true, type: DETAILS}})}>
          {state.details.length > 0 ? 'edit': 'add'} details
        </button>
      </div>
    );
}

export default Detail
