import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

//importing redux stuff here
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../slices/userSlice";

//importing chakra ui stuff here
import {
  Avatar,
  HStack,
  HoverCard,
  Icon,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuChartLine } from "react-icons/lu";

export const NavBar = () => {
  // managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //all the redux stuff here
  const token = useSelector((state) => state.user.token);

  //function for calling backend logout function
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      if (res) {
        console.log(res);
        localStorage.removeItem("token");
        dispatch(clearToken());
        navigate("/");
      }
    } catch (err) {
      console.log("internal server error at logout caller function");
    }
  };

  return (
    <div className="bg-black text-white h-10 flex justify-between">
      {/*accessible to everyone*/}
      <Link to="/">StudyNotion Logo</Link>

      <HoverCard.Root size="sm">
        <HoverCard.Trigger asChild>
          <Link>Catalog</Link>
        </HoverCard.Trigger>
        <Portal>
          <HoverCard.Positioner>
            <HoverCard.Content>
              <HoverCard.Arrow />
              <Stack gap="4" direction="row">
                <Stack gap="3">
                  <Stack gap="1">
                    <Link>
                      <Text textStyle="sm">Web Development</Text>
                    </Link>
                    <Link>
                      <Text textStyle="sm">Java</Text>
                    </Link>
                    <Link>
                      <Text textStyle="sm">Python</Text>
                    </Link>
                    <Link>
                      <Text textStyle="sm">System Design</Text>
                    </Link>
                    <Link>
                      <Text textStyle="sm">C++</Text>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </HoverCard.Content>
          </HoverCard.Positioner>
        </Portal>
      </HoverCard.Root>

      {/* logical rendering based on whether user is logged in // token's presence */}
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
          {/* temp jugaad to access dashboard */}
          <Link to="/dashboard/my-profile">Dashboard</Link>
          <button onClick={logoutHandler}>Log Out!</button>
        </div>
      )}
    </div>
  );
};
