import moment from "moment";
import { useEffect, useState } from "react";

interface UserData {
  profilePicture: string;
  username: string;
  createdAt: Date;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Comment = ({ comment }: any) => {
  const [user, setUser] = useState<UserData | null>(null); // Updated initial state to null

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [comment.userId]);

  return (
    <div>
      {user === null ? (
        <div>Loading user...</div>
      ) : (
        <div className="flex border-b border-gray-2aa00  p-3 ">
          <div className="flex-shrink-0 mr-3 ">
            <img
              className="h-10 w-10 rounded-full"
              src={user.profilePicture}
              alt={user.username}
            />
          </div>
          <div>
            <div className="flex flex-1 flex-row items-center">
              <span className="font-bold mr-1 text-xm truncate">
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              <span className="text-gray-500 text-xm">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className=" text-gray-500 mb-2">{comment.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};
