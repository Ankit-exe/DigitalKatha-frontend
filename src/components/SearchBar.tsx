import { useDispatch, useSelector } from "react-redux";
import { searchHide } from "../redux/search/searchSlice";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const showSearch = useSelector((state: any) => state.search.showSearch);

  const handleOutsideClick = (e: any) => {
    if (e.target === e.currentTarget) {
      dispatch(searchHide());
    }
  };

  const handleInsideClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      {showSearch && (
        <div
          className="fixed inset-0 z-40 justify-center bg-black bg-opacity-80 p-3 flex"
          onClick={handleOutsideClick}
        >
          <div
            className="mt-40 h-[200px] w-[600px] bg-slate-200 rounded-lg p-5"
            onClick={handleInsideClick}
          >
            x
          </div>
        </div>
      )}
    </>
  );
};
