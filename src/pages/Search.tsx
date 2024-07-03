import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { options } from "../types";
import { PostCard } from "../components/PostCard";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Search = () => {
  const [sidebarData, setSideBarData] = useState<any>({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [morePost, setMorePost] = useState<FormData[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFormUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFormUrl || categoryFromUrl) {
      setSideBarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFormUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPost = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${API_BASE_URL}/api/post/getposts?${searchQuery}`
      );
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPost(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        }
      }
    };
    fetchPost();
  }, [location.search]);

  const handleChange = (e: any) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sidebarData, category });
    }
  };
  const handleShowMore = async () => {
    const startIndex = morePost.length;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/post/getposts?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setMorePost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {}
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-300 dark:border-gray-700">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center gap-3 w-full">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex flex-row items-center gap-3 w-full">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              {options.map((item) => (
                <option value={item.value}>{item.option}</option>
              ))}
            </Select>
          </div>
          <Button
            type="submit"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-1 text-center shadow-md shadow-pink-400"
          >
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-300 dark:border-gray-700 p-3 mt-5">
          Post Results :
        </h1>
        <div className=" p-7 flex ">
          <div className="flex flex-wrap gap-7  mx-auto w-full">
            {!loading && post.length === 0 && <p>No result found.</p>}
            {loading && <Spinner />}
            {!loading && post && post.map((post) => <PostCard post={post} />)}
            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-pink-500 self-center text-sm py-7 hover:underline "
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
