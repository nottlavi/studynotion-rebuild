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
    <header className="site-shell glass-panel sticky top-3 z-50 px-4 py-3 float-in">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-white grid place-items-center font-extrabold">
            SN
          </div>
          <div>
            <p className="font-bold text-slate-900">StudyNotion</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Learn. Build. Lead.
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-4 items-center text-slate-700 font-semibold">
          <Link to="/" className={path === "/" ? "text-blue-700" : ""}>
            Home
          </Link>
          <HoverCard.Root size="sm">
            <HoverCard.Trigger asChild>
              <div className="cursor-pointer flex items-center gap-1">
                Catalog <FaAngleDown />
              </div>
            </HoverCard.Trigger>
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content className="rounded-xl border border-slate-200 bg-white shadow-xl">
                  <HoverCard.Arrow />
                  <Stack gap="3">
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
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
          </HoverCard.Root>
          <Link
            to="/about"
            className={path === "/about" ? "text-blue-700" : ""}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={path === "/contact" ? "text-blue-700" : ""}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {token === "" ? (
            <div className="flex gap-2">
              <Link to="/login">
                <button
                  type="button"
                  className="!bg-white !text-slate-800 !border !border-slate-300"
                >
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button type="button">Get Started</button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard/cart"
                className="section-card !py-1.5 !px-2.5 flex items-center gap-1"
              >
                <IoCartOutline />
                <div className="text-sm font-semibold">{count}</div>
              </Link>
              <Link to="/dashboard/my-profile">
                <button
                  type="button"
                  className="!bg-white !text-slate-800 !border !border-slate-300"
                >
                  Dashboard
                </button>
              </Link>
              <button type="button" onClick={logout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
