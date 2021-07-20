import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import catchAsync from '../../../utils/client/functions/catchAsync';
import { COMPLICATED, CURRENT_CITY, DIVORCED, EDUCATION, ENGAGED, HOME_TOWN, IN_A_RELATIONSHIP, MARRIED, RELATIONSHIP_STATUS, SEPARATED, SINGLE, WORK } from '../../../utils/global/variables';
import Button from '../../Buttons/Button';
import Spacer from '../../Spacer';
import Model from '../Model';
import ArrayItem from './ArrayItem';
import RelationShipItem from './RelationShipItem';
import { cloneDeep } from 'lodash'
import StringItem from './StringItem';

const DetailsModel = ({ closeModel }) => {
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    [WORK]: state.user?.[WORK] || [],
    [EDUCATION]: state.user?.[EDUCATION] || [],
    [CURRENT_CITY]: state.user?.[CURRENT_CITY] || '',
    [HOME_TOWN]: state.user?.[HOME_TOWN] || '',
    [RELATIONSHIP_STATUS]: state.user?.[RELATIONSHIP_STATUS] || ''
  });

  const updateDetail = () => catchAsync(async () => {
    setLoading(true);
    
    const updatedData = cloneDeep(data);
     
    Object.keys(updatedData).forEach(key => {
      if (Array.isArray(updatedData[key]) && updatedData[key].length > 0) {
        updatedData[key].forEach(item => delete item._id);
      }
    })
    
    // send request 
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API || 'api'}/v1/users`, updatedData, { withCredentials: true });

    // update state
    setState({ ...state, user: res.data.data?.user, alert: { show: true, text: 'details updated' }, model: { ...state.model, show: false } });
    setLoading(false);
  }, setState, () => setLoading(false));

  // cleanup 
  useEffect(() => () => { }, []);
  
    return (
      <Model closeModel={closeModel} showHeader title="Edit Details">
        <div className="max-h-96 flex flex-col justify-between">
          <div className=" overflow-auto styled-scrollbar p-3">
            <h2 className="text-lg capitalize">Customize your intro</h2>
            <p className="dark:text-gray-400">
              Details you select will be public and won't post to News Feed.
            </p>
            <div className="grid gap-y-5 mt-3">
              <ArrayItem
                type={WORK}
                title="work"
                data={data}
                setData={setData}
              />
              <ArrayItem
                type={EDUCATION}
                title="education"
                data={data}
                setData={setData}
              /> 
              <StringItem
                type={CURRENT_CITY}
                title="current city"
                data={data}
                setData={setData}
              /> 
              <StringItem
                type={HOME_TOWN}
                title="home town"
                data={data}
                setData={setData}
              /> 
              <RelationShipItem title="relationship status" data={data} setData={setData}/>
            </div>
          </div>
          <div className="">
            <Spacer className="my-0" />
            <div className="p-3 flex justify-between items-center">
              <button
                className="capitalize text-blue-500"
                onClick={updateDetail}
              >
                update your information
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="py-1 px-2 rounded-md dark:bg-dark-400"
                  onClick={() => closeModel()}
                >
                  Cancel
                </button>
                <Button
                  loading={loading}
                  className="py-1.5 px-10 rounded-md dark:bg-blue-500"
                  onClick={updateDetail}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Model>
    );
}

export default DetailsModel

