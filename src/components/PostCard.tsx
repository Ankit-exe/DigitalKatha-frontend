import { Link } from "react-router-dom";

export const PostCard = ({ post }: any) => {
  return (
    <div className="dark:shadow-gray-700 border-gray-200 border hover:shadow-md transition-shadow duration-300 overflow-hidden rounded-lg  w-full lg:w-[350px] group">
      <Link to={`/post/${post.slug}`} className="flex flex-col gap-3">
        <img
          src={post.image}
          className="h-[320px] sm:h-[220px] w-full object-cover group-hover:scale-105 transition-scale duration-300 bg-gray-400"
        />
        <div className="flex items-center px-3">
          <p className="text-sm text-pink-600 truncate w-full">
            {post.category}
          </p>
        </div>
        <div className="px-3 flex flex-col gap-3 w-full pb-3">
          <p className="text-xl text-gray-700 dark:text-gray-100 font-bold">
            {post.title}
          </p>
          <p
            className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400 font-medium mb-5"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></p>
        </div>
      </Link>
    </div>
  );
};
