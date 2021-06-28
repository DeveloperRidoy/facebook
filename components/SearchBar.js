import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';


const SearchBar = ({tabIndex, tooltip}) => {

  const [expand, setExpand] = useState(false);


    return (
      <form className="flex items-center bg-secondary dark:bg-dark-400 rounded-3xl p-2 ml-3 text-gray-500 relative">
        <label htmlFor="searchInput">
          <IoSearch fontSize="1.3em" className="hidden xl:block" />
        </label>
        <label
          htmlFor="searchInput"
          className="xl:hidden cursor-pointer"
          tabIndex={tabIndex}
          tooltip={tooltip}
          onFocus={() => setExpand(true)}
          onKeyPress={(e) => { e.key === 'Enter' && setExpand(!expand); console.log('keypress')}}
          onClick={() => setExpand(!expand)}
        >
          <IoSearch fontSize="1.3em" />
        </label>
        {expand ? (
          <input
            id="searchInput"
            type="text"
            className={`bg-transparent dark:text-white dark:placeholder-gray-400 focus:outline-none ml-2 pr-2 absolute z-10`}
            placeholder="Search Facebook"
            tabIndex={tabIndex}
            // onBlur={() => setExpand(false)}
          />
        ) : (
            <input
              id="searchInput"
              type="text"
              className="bg-transparent dark:text-white dark:placeholder-gray-400 focus:outline-none ml-2 pr-2 hidden xl:block"
              placeholder="Search Facebook"
              tabIndex={tabIndex}
          />
        )}
      </form>
    );
}

export default SearchBar
