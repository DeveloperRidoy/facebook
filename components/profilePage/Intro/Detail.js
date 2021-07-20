import { useState } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext"
import { DETAILS } from "../../../utils/client/variables";
import { CURRENT_CITY, EDUCATION, HOME_TOWN, RELATIONSHIP_STATUS, WORK } from "../../../utils/global/variables";

const Detail = () => {
    const [state, setState] = useGlobalContext();
    const detail = {
      [WORK]: state.user?.[WORK],
      [EDUCATION]: state.user?.[EDUCATION],
      [HOME_TOWN]: state.user?.[HOME_TOWN],
      [CURRENT_CITY]: state.user?.[CURRENT_CITY],
      [RELATIONSHIP_STATUS]: state.user?.[RELATIONSHIP_STATUS],
  };
    const detailsEmpty = Object.keys(detail).every(item => item.length === 0)

    return (
      <div>
        <div className="grid gap-2">
          {!detailsEmpty && Object.keys(detail).map((key, i) => <Item key={i} item={detail[key]} type={key}/>)}
        </div>
        <button
          className="mt-1 w-full capitalize font-semibold bg-dark-400 rounded-md p-1.5 hover:brightness-125 transition active:scale-95"
          onClick={() =>
            setState((state) => ({
              ...state,
              model: { show: true, type: DETAILS },
            }))
          }
        >
          {detailsEmpty ? "add" : "edit"} details
        </button>
      </div>
    );
}

export default Detail


const Item = ({item, type}) => {
  if (Array.isArray(item)) return (
    <>
      {item.map(
        (item) =>
          item.active && (
            <div key={item._id} className="flex gap-2 items-center">
              <div className="dark:text-gray-400 text-lg">
                {type === WORK ? (
                  <FaBriefcase />
                ) : (
                  type === EDUCATION && <FaGraduationCap className="text-2xl" />
                )}
              </div>
              <p>
                <span className="font-light">
                  {type === WORK
                    ? item.current
                      ? "works at "
                      : "worked at "
                    : type === EDUCATION
                    ? item.current
                      ? "studies at "
                      : "graduated from "
                    : ""}
                </span>
                <span className="text-lg capitalize">{item.text}</span>
              </p>
            </div>
          )
      )}
    </>
  );

  if (typeof item === 'string') return (
    <p>
      <span className="dark:text-gray-400">
        {type === CURRENT_CITY ? "Lives in" : type === HOME_TOWN ? "From": type === RELATIONSHIP_STATUS && 'RelationShip Status'}
      </span>{" "}
      {item}
    </p>
  );

  return ''
}