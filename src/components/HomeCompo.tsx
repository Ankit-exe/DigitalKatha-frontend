import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HomeCompo = ({ post }: any) => {
  return (
    <div className=" w-full mx-auto mt-20 ">
      {post.post ? (
        <div className="grid lg:grid-cols-11  h-full ">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 h-full"
          >
            <Link to={`/post/${post.post.slug}`}>
              <img
                src={post.post.image}
                className="h-[380px] w-[680px] object-cover rounded-2xl hover:scale-105 transition-scale duration-300 bg-gray-100 "
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" lg:col-span-6 h-full py-10 lg:ml-10"
          >
            <div className="flex flex-col gap-5">
              <span className="text-pink-500 text-sm hover:scale-105 transition-all duration-200 w-fit ">
                {post.post.category}
              </span>
              <h1 className="text-4xl font-bold hover:scale-105 transition-scale duration-300">
                {post.post.title}
              </h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.post && post.post.content,
                }}
                className="line-clamp-3 text-base text-gray-500 hover:scale-105 transition-scale duration-300"
              ></p>
              <Link to={`/post/${post.post.slug}`}>
                <Button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-3xl text-sm px-1 text-center shadow-md shadow-pink-400">
                  Read More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
