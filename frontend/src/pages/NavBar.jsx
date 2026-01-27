import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

//importing redux stuff here
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, clearToken } from "../slices/userSlice";

//importing chakra ui stuff here
import { HoverCard, Portal, Stack, Text } from "@chakra-ui/react";

//importing react icons here
import { FaAngleDown } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

export const NavBar = () => {
  ///all states here

  ///all redux stuff here
  const token = useSelector((state) => state.user.token);
  const count = useSelector((state) => state.cart.count);

  //all dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const logout = useLogout();

  ///all the functions here

  return (
    <div className="bg-black text-white h-10 flex justify-between">
      {/*accessible to everyone*/}
      <Link to="/" className="flex items-center">
        StudyNotion Logo
      </Link>

      {/* map button to the whole site */}
      <div className="flex gap-2 items-center">
        {/* div for home */}
        <Link to={"/"} className={path === "/" ? "text-yellow-400" : ""}>
          Home
        </Link>
        {/* whole menu on hover expands */}
        <HoverCard.Root size="sm">
          <HoverCard.Trigger asChild>
            <div className="cursor-pointer flex items-center gap-1">
              Catalog <FaAngleDown />
            </div>
          </HoverCard.Trigger>
          <Portal>
            <HoverCard.Positioner>
              <HoverCard.Content>
                <HoverCard.Arrow />
                <Stack gap="4" direction="row">
                  <Stack gap="3">
                    <Stack gap="1">
                      <Link to={`/course-category/6978c3293f8f362f1f92317c`}>
                        <Text textStyle="sm">Web Development</Text>
                      </Link>
                      <Link to={`/course-category/6978c32f3f8f362f1f92317e`}>
                        <Text textStyle="sm">Java</Text>
                      </Link>
                      <Link to={`/course-category/6978c4053f8f362f1f923191`}>
                        <Text textStyle="sm">Python</Text>
                      </Link>
                      <Link to={`/course-category/6978c4113f8f362f1f923193`}>
                        <Text textStyle="sm">System Design</Text>
                      </Link>
                      <Link to={`/course-category/6978c41a3f8f362f1f923195`}>
                        <Text textStyle="sm">C++</Text>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </HoverCard.Content>
            </HoverCard.Positioner>
          </Portal>
        </HoverCard.Root>
        {/* div for about us */}
        <Link
          to={"/about"}
          className={path === "/about" ? "text-yellow-400" : ""}
        >
          About Us
        </Link>
        {/* contact us div */}
        <Link
          to={"/contact"}
          className={path === "/contact" ? "text-yellow-400" : ""}
        >
          Contact Us
        </Link>
      </div>

      {/* logical rendering based on whether user is logged in // token's presence */}
      <div className="flex items-center gap-2">
        {token === "" ? (
          <div className="flex gap-3">
            <Link to="/login">
              <button>log in</button>
            </Link>
            <Link to="/signup">
              <button>sign up</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* cart here */}
            <Link to={"/dashboard/cart"}>
              <IoCartOutline />
              {/* in this div i will show the no of items in the div */}
              <div>{count}</div>
            </Link>
            {/* temp jugaad to access dashboard */}
            <Link to="/dashboard/my-profile">Dashboard</Link>
            <button onClick={logout}>Log Out!</button>
          </div>
        )}
      </div>
    </div>
  );
};
