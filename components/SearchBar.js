import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useGlobalContext } from "../context/GlobalContext";
import Axios from "../utils/client/axios";
import catchAsync from "../utils/client/functions/catchAsync";
import Spinner from "./Spinners/Spinner/Spinner";

const SearchBar = ({ tabIndex, tooltip, searchActive, setSearchActive }) => {
  const [, setState] = useGlobalContext();
  const [searchState, setSearchState] = useState({
    expand: false,
    text: "",
    loading: false,
    results: [],
  });
  const [showMobileSearchBar, setshowMobileSearchBar] = useState(false)

  const submitSearch = (viaForm, e) =>
    catchAsync(
      async () => {
        e.preventDefault();
        let searchText = "";
        if (viaForm) {
          setSearchState((state) => ({
            ...state,
            text: searchState.text ? true : false,
          }));
          searchText = searchState.text;
        } else {
          setSearchState((state) => ({
            ...state,
            loading:
              e.target.value && e.target.value !== searchState.text
                ? true
                : false,
          }));
          searchText = e.target.value;
        }

        if (searchText === "")
          return setSearchState((state) => ({
            ...state,
            loading: false,
            results: [],
          }));
        const res = await Axios.get(`users/name/${searchText}`);
        setSearchState((state) => ({
          ...state,
          results: res.data.data?.users,
          loading: false,
        }));
      },
      setState,
      () => setSearchState((state) => ({ ...state, loading: false }))
    );

  const deactivateSearchOnClick = () => setSearchActive(false);
  const deactivateSearchOnEscapeKeyPress = (e) => {
    if (e.key === "Escape") setSearchActive(false);
  };

  const activateSearch = (e) => {
    e.stopPropagation();
    setSearchActive(true);

    document.body.addEventListener("click", deactivateSearchOnClick);
    document.body.addEventListener("keydown", deactivateSearchOnEscapeKeyPress);
  };

  useEffect(
    () => () => {
      document.body.removeEventListener("click", deactivateSearchOnClick);
      document.body.removeEventListener(
        "keydown",
        deactivateSearchOnEscapeKeyPress
      );
    },
    []
  );

  return (
    <div className="">
      <form
        className={`flex items-center bg-secondary dark:bg-dark-400 rounded-3xl p-2 text-gray-500 transition ${
          searchActive ? "absolute lg:relative right-2 left-9 top-2 lg:top-0" : "relative"
        }`}
        onSubmit={() => submitSearch(true)}
      >
        {!searchActive && (
          <label htmlFor="searchInput" className="cursor-pointer" >
            <IoSearch fontSize="1.3em" />
          </label>
        )}

        <input
          id="searchInput"
          type="text"
          className={`${searchActive ? 'block': 'hidden sm:block'} bg-transparent dark:text-white dark:placeholder-gray-400 focus:outline-none ml-2 pr-2 w-full sm:max-w-[180px]`}
          placeholder="Search Facebook"
          tabIndex={tabIndex}
          onClick={activateSearch}
          onChange={(e) => {
            submitSearch(false, e);
            if (e.target.value && !searchActive) setSearchActive(true);
            setSearchState((state) => ({ ...state, text: e.target.value }));
          }}
          required
        />
      </form>
      {searchActive && (
        <div
          className="absolute dark:bg-dark left-0 top-full dark:border-[1px] dark:border-gray-700 rounded-b-lg lg:min-w-[400px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-h-[calc(100vh-70px)] overflow-auto p-2">
            {searchState.loading ? (
              <Spinner className="mx-auto" />
            ) : (
              <p className="text-lg capitalize dark:text-white mx-auto max-w-max">
                search results
              </p>
            )}
            <div className="flex flex-col gap-y-2 mt-2">
              {searchState.results?.length > 0 &&
                searchState.results.map((user) => (
                  <Link key={user._id} href={`/users/${user.slug}`}>
                    <a
                      href={`/users/${user.slug}`}
                      className="flex items-center gap-x-1 transition hover:bg-dark-400 p-2 rounded capitalize"
                      onClick={() => setSearchActive(false)}
                    >
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={`/img/users/${user.photo || "default/user.jpg"}`}
                          layout="fill"
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL="/img/users/default/user.jpg"
                        />
                      </div>
                      <p>{user.fullName}</p>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;