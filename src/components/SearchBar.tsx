import { useDispatch, useSelector } from "react-redux";
import { searchHide } from "../redux/search/searchSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const showSearch = useSelector((state: any) => state.search.showSearch);
  const [recentSearch, setRecentSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleOutsideClick = (e: any) => {
    if (e.target === e.currentTarget) {
      dispatch(searchHide());
    }
  };

  const handleInsideClick = (e: any) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    dispatch(searchHide());
    setRecentSearch(searchTerm);
  };

  return (
    <>
      {showSearch && (
        <div
          className="fixed inset-0 z-40 justify-center bg-gray-600 bg-opacity-80 p-3 flex   "
          onClick={handleOutsideClick}
        >
          <div
            className="mt-40 h-[400px] w-[600px] bg-slate-200 dark:bg-slate-800 rounded-lg "
            onClick={handleInsideClick}
          >
            <div className="flex flex-row  w-full items-center px-4 py-2 border-b border-gray-300">
              <AiOutlineSearch size={24} />
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:border-none focus:ring-0 text-lg px-0 mx-1"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
            <div className="px-4 py-4">
              <span className="text-gray-500 font-semibold">Recent</span>
              <div className="flex flex-col gap-2 py-2">
                <Link to={`/search?searchTerm=${recentSearch}`}>
                  <div
                    className="w-full text-base font-semibold px-3 py-3 bg-slate-300 rounded-xl line-clamp-1 flex justify-between hover:cursor-pointer text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-100 ease-in-out"
                    onClick={() => dispatch(searchHide())}
                  >
                    {recentSearch}
                    <ArrowRightOutlined className="animate-pulse " />
                  </div>
                </Link>

                {/* {recentSearch.map((item) => (
                  <>
                    {!item ? (
                      ""
                    ) : (
                      <div className="w-full text-base font-semibold px-3 py-3 bg-slate-300 rounded-xl line-clamp-1 flex justify-between hover:cursor-pointer text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-100 ease-in-out">
                        {item}
                        <ArrowRightOutlined className="animate-pulse " />
                      </div>
                    )}
                  </>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
