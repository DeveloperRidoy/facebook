import { useState } from 'react';
import { CURRENT_CITY, EDUCATION, HOME_TOWN, WORK } from '../../../utils/global/variables';
import Model from '../Model';
import DetailItem from './DetailItem';

const DetailsModel = ({ closeModel }) => {
  
  const [data, setData] = useState({
    [WORK]: [],
    [EDUCATION]: [],
    [CURRENT_CITY]: '',
    [HOME_TOWN]: ''
  })

    return (
      <Model closeModel={closeModel} showHeader title="Edit Details">
        <div className="p-3 max-h-96 overflow-auto styled-scrollbar">
          <h2 className="text-lg capitalize">Customize your intro</h2>
          <p className="dark:text-gray-400">
            Details you select will be public and won't post to News Feed.
          </p>
          <div className="grid gap-y-5 mt-3">
            <DetailItem
              type={WORK}
              title="work"
              data={data}
              setData={setData}
            />
            <DetailItem
              type={EDUCATION}
              title="education"
              data={data}
              setData={setData}
            />
            <DetailItem
              type={CURRENT_CITY}
              title="current city"
              data={data}
              setData={setData}
            />
            <DetailItem
              type={HOME_TOWN}
              title="home town"
              data={data}
              setData={setData}
            />
          </div>
        </div>
      </Model>
    );
}

export default DetailsModel

