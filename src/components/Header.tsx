import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "../index.css";
import { AppstoreTwoTone, BookTwoTone, HomeTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Header = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/signout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-center ">
        <img src={logo} alt="logo" className="h-16" />
      </Link>
      <div className="flex gap-3 md:order-3">
        <button>
          <AiOutlineSearch
            size={30}
            className="text-gray-500 hover:text-pink-500  transition-all"
          />
        </button>
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toogleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-3xl text-sm px-1 text-center shadow-md shadow-pink-400">
                SignIn
              </Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="border-solid border-2 border-gray-200 rounded-md md:border-none">
        <Navbar.Link active={path === "/"} as={"div"} className="dark:bg-gray">
          <Link
            to="/"
            className={
              path === "/"
                ? "block py-2 px-3 text-white bg-pink-600 rounded md:bg-transparent md:text-pink-600 md:p-0 dark:text-white md:dark:text-pink-500 text-base"
                : "text-base underline-animation hover:text-pink-500"
            }
          >
            <HomeTwoTone className="mr-1" twoToneColor="#fe3f96" />
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          className="dark:bg-gray"
        >
          <Link
            to="/about"
            className={
              path === "/about"
                ? "block py-2 px-3 text-white bg-pink-600 rounded md:bg-transparent md:text-pink-600 md:p-0 dark:text-white md:dark:text-pink-500 text-base "
                : "text-base underline-animation hover:text-pink-500"
            }
          >
            <BookTwoTone className="mr-1" twoToneColor="#fe3f96" />
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/projects"}
          as={"div"}
          className="dark:bg-gray"
        >
          <Link
            to="/projects"
            className={
              path === "/projects"
                ? "block py-2 px-3 text-white bg-pink-600 rounded md:bg-transparent md:text-pink-600 md:p-0 dark:text-white md:dark:text-pink-500 text-base"
                : "text-base underline-animation hover:text-pink-500"
            }
          >
            <AppstoreTwoTone className="mr-1" twoToneColor="#fe3f96" />
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
