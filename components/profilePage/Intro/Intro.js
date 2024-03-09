import { useGlobalContext } from "../../../context/GlobalContext";
import Bio from "./Bio";
import Detail from "./Detail";

const Intro = ({user, ownProfile}) => {
    return (
      <div className="dark:bg-dark shadow p-2 rounded-lg grid gap-y-4">
        <p className="text-lg font-semibold">Intro</p>
        <Bio user={user} ownProfile={ownProfile} />
        <Detail user={user} ownProfile={ownProfile} />
        {ownProfile && (
          <>
            <Button user={user}>add hobbies</Button>
            <Button user={user}>add features</Button>
          </>
        )}
      </div>
    );
}

export default Intro

const Button = ({ children }) => (
  <button className="capitalize font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-dark-400 rounded-md p-1.5 dark:hover:brightness-125 transition active:scale-95">
    {children}
  </button>
);