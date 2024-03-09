import {
  COMPLICATED,
  DIVORCED,
  ENGAGED,
  IN_A_RELATIONSHIP,
  MARRIED,
  RELATIONSHIP_STATUS,
  SEPARATED,
  SINGLE,
} from "../../../utils/global/variables";

const RelationShipItem = ({ title, data, setData }) => {
  return (
    <div className="flex gap-2">
      <p className="capitalize text-lg font-semibold">{title}</p>
      <select
        className="dark:bg-dark-400 rounded-md p-2 capitalize cursor-pointer"
        value={data[RELATIONSHIP_STATUS]}
        onChange={(e) =>
          setData({ ...data, [RELATIONSHIP_STATUS]: e.target.value })
        }
      >
        <option value={SINGLE}>single</option>
        <option value={IN_A_RELATIONSHIP}>in a relationship</option>
        <option value={ENGAGED}>engaged</option>
        <option value={MARRIED}>married</option>
        <option value={SEPARATED}>separated</option>
        <option value={DIVORCED}>divorced</option>
        <option value={COMPLICATED}>complicated</option>
      </select>
    </div>
  );
};

export default RelationShipItem;
