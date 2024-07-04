import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";

export const CreatePost = () => {
  return (
    <div className="sticky bottom-10 w-full flex justify-end animate-bounce">
      <Link to="/create-post">
        <Button
          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-full text-sm  shadow-md shadow-pink-400"
          aria-label="Create post"
        >
          <HiOutlinePlus className="h-9 w-6" />
        </Button>
      </Link>
    </div>
  );
};
