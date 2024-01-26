import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GlobalNavbar } from "../../components/globalNavbar";
import { UserImage } from "../../components/UserImage";

export const Activity = () => {
  const { option } = useParams();
  const [activity, setActivity] = useState(undefined);
  const isNotMobileScreen = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const lightText = theme.palette.neutral.light;

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getOption = async () => {
      if (option === "comment") {
        const saveOptionResponse = await fetch(
          `http://localhost:3001/post/getCommentPost/${user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application-json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { allCommentPost } = await saveOptionResponse.json();
        setActivity(allCommentPost);
      } else if (option === "like") {
        const saveOptionResponse = await fetch(
          `http://localhost:3001/post/getLikePost/${user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application-json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { allLikePost } = await saveOptionResponse.json();
        setActivity(allLikePost);
      }
    };

    getOption();
  }, [option]);

  return (
    <Box p={1}>
      <GlobalNavbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box width={isNotMobileScreen ? "60%" : "95%"}>
          {activity?.map((posts, index) => {
            return (
              <Box
                key={index}
                p={2}
                width="100%"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={1.8}
                  onClick={() => navigate(`/profile/${posts?.userId}`)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <UserImage image={posts.userProfilePicturePath} size="50px" />
                  <Box>
                    <Typography fontSize={isNotMobileScreen ? "16px" : "13px"}>
                      {posts.fName} {posts.lName}
                    </Typography>
                    <Typography
                      color={lightText}
                      fontSize={isNotMobileScreen ? "13px" : "11px"}
                    >
                      {posts.location}
                    </Typography>
                  </Box>
                </Box>
                <img
                  height="auto"
                  width="100%"
                  style={{
                    borderRadius: "10px",
                  }}
                  src={`http://localhost:3001/assets/${posts.postPath}`}
                />
                <Typography fontSize={isNotMobileScreen ? "16px" : "13px"}>
                  {posts.description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
