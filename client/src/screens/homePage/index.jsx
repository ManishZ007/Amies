import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { SideBarWidgets } from "./homePageWidgets/sideBarWidgets";
import { useDispatch, useSelector } from "react-redux";

// import { io } from "socket.io-client";

import { Navbar } from "../navbar";
import { FollowersWidget } from "./homePageWidgets/followerWidgets";
import { AlllPostWidget } from "./homePageWidgets/allPostWidget";

export const Home = () => {
  const theme = useTheme();
  const altBackground = theme.palette.background.alt;
  const isrightSideBarIsNotOnaMobile = useMediaQuery("(min-width: 1050px)");
  const isNotMobileScreen = useMediaQuery("(min-width: 800px)");
  const user = useSelector((state) => state.user);

  return (
    <Box display="flex">
      {isNotMobileScreen && <SideBarWidgets user={user} />}
      <Box
        p={2}
        width={isNotMobileScreen ? "70%" : "100%"}
        sx={{
          height: "100vh",
        }}
      >
        <Navbar />
        <AlllPostWidget />
      </Box>
      {isrightSideBarIsNotOnaMobile && (
        <Box
          p={1}
          width={isrightSideBarIsNotOnaMobile ? "28%" : "none"}
          bgcolor={altBackground}
          sx={{
            height: "100vh",
          }}
        >
          <FollowersWidget />
        </Box>
      )}
    </Box>
  );
};
