import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../redux/user/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 select-none">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-se-lg rounded-es-lg text-white">
          MERN
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit} className="flex items-center gap-0">
        <TextInput
          type="text"
          placeholder="Ara"
          aria-label="Search input"
          style={{ borderRadius: "50px 0 0 50px", borderRight: "none" }}
          className="hidden lg:inline w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          className="w-14 h-10 hidden lg:inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
          type="submit"
          color="white"
          title="Ara"
          style={{
            padding: "21px",
            borderRadius: "0 50px 50px 0",
          }}
          aria-label="Search button">
          <AiOutlineSearch className="size-6 " color="white" />
        </Button>
      </form>

      <div className="flex gap-2 md:order-2 ">
        <Button
          className="w-12 h-10 hidden sm:inline focus:ring-0  focus:outline-none"
          color="gray"
          pill
          onClick={() => dispatch(toogleTheme())}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }>
            <Dropdown.Header>
              <span className="block text-sm ">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profil</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Çıkış yap</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Giriş yap
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Ana Sayfa</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">Hakkımda</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projeler</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/search"}
          as={"div"}
          className="sm:hidden">
          <Link to="/search?searchTerm=">Arama</Link>
        </Navbar.Link>
        <div className=" sm:hidden w-20 ml-1 mt-2 focus:ring-0  focus:outline-none border border-solid  rounded-2xl border-slate-800  dark:border-gray-500">
          <Link color="gray" onClick={() => dispatch(toogleTheme())}>
            {theme === "light" ? (
              <FaMoon
                className="
              border border-solid border-slate-500 rounded-2xl size-8 bg-slate-100 hover:bg-gradient-to-r bg from-slate-200 via-slate-300 to-slate-400 p-2 ml-12"
              />
            ) : (
              <FaSun
                className="
              border border-solid rounded-2xl size-8  bg-slate-800 hover:bg-gradient-to-r bg from-slate-500 via-slate-600 to-slate-700 p-2 "
              />
            )}
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
