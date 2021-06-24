import Link from 'next/link';
import { FaArrowLeft, FaKeyboard, FaMoon } from "react-icons/fa";
import { useGlobalContext } from '../../../../context/GlobalContext';

const DisplayAccessibility = ({ setMode }) => {

    const [state, setState] = useGlobalContext();

    return (
      <div className={`w-full transition p-1`}>
        <div className="flex gap-x-3">
          <button
            className="p-2 ml-2 rounded-full hover:bg-secondary active:bg-gray-300 active:outline-none"
            onClick={() => setMode(null)}
          >
            <FaArrowLeft />
          </button>
          <p className="text-xl font-semibold capitalize">
            display & accessibility
          </p>
        </div>
        <div className="p-2 ">
            <div className="flex gap-x-3 items-start">
                <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition text-xl">
                    <FaMoon />
                </div>
                <div className="leading-5">
                    <p className="font-semibold capitalize">dark mode</p>
                    <p className="text-gray-500 text-sm">
                        Adjust the appearance of Facebook to reduce glare and give your eyes a break.
                    </p>
                </div>
            </div>
                <div className="flex flex-col pl-5">
            <button
                className="w-full rounded-lg my-1 p-2 flex items-center justify-between hover:bg-secondary transition focus:outline-none focus:ring active:bg-gray-200 font-semibold"
                onClick={() =>  setState({ ...state, darkMode: false })}
            >
                <p>off</p> 
                <div className={`h-5 w-5 flex justify-center items-center rounded-full border-2 ${!state.darkMode ? 'border-blue-500': 'border-gray-500'}`}>
                   <div className={`h-2.5 w-2.5 transition transform rounded-full bg-blue-500 ${!state.darkMode ? '': 'scale-0'}`}></div>
                </div>
            </button>
            <button
                className="w-full rounded-lg my-1 p-2 flex items-center justify-between hover:bg-secondary transition focus:outline-none focus:ring active:bg-gray-200 font-semibold"
                onClick={() =>  setState({ ...state, darkMode: true })}
            >
                <p>on</p> 
                <div className={`h-5 w-5 flex justify-center items-center rounded-full border-2 ${state.darkMode ? 'border-blue-500': 'border-gray-500'}`}>
                    <div className={`h-2.5 w-2.5 transition transform rounded-full bg-blue-500 ${state.darkMode ? '': 'scale-0'}`}></div>
                </div>
            </button>
            </div>
        </div>
        <Item link="/keyboard" text="keyboard">
            <FaKeyboard/>
        </Item>
      </div>
    );
}

export default DisplayAccessibility


const Item = ({children, link, text}) => (
  <Link href={link}>
    <a
      href={link}
      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary transition group active:outline-none"
    >
      <div className="flex gap-x-3 items-center">
        <div className="p-2 rounded-full bg-gray-400 bg-opacity-40 transition group-hover:bg-opacity-50 text-xl">
          {children}
        </div>
        <p className="font-semibold capitalize">{text}</p>
      </div>
    </a>
  </Link>
);