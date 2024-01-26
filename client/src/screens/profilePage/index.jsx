import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GlobalNavbar } from "../../components/globalNavbar";
import { UserImage } from "../../components/UserImage";
import { FlexBetween } from "../../components/FlexBetween";
import { CreatePostDialog } from "../../components/DialogCreatePost";

export const ProfilePage = () => {
  const { Id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserPost, setCurrentUserPost] = useState(null);
  const [reqType, setReqType] = useState("follow");
  const [createDialogPost, setCreateDialogPost] = useState(false);
  const isNotMobileScreen = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const handleSendRequest = async (reqType) => {
    if (reqType === "follow") {
      const saveFollowUserResponse = await fetch(
        `http://localhost:3001/user/follow/${user?._id}/${currentUser?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { requestedUser } = await saveFollowUserResponse.json();

      console.log(requestedUser);
    } else if (reqType === "unFollow") {
      const saveUnFollowUserResponse = await fetch(
        `http://localhost:3001/user/unFollow/${user?._id}/${currentUser?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { requestedUser } = await saveUnFollowUserResponse.json();

      console.log(requestedUser);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const saveUserResponse = await fetch(`http://localhost:3001/user/${Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { currentUser } = await saveUserResponse.json();

      setCurrentUser(currentUser);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserPost = async () => {
      const saveUserPostResponse = await fetch(
        `http://localhost:3001/post/${Id}/posts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { userPosts } = await saveUserPostResponse.json();

      setCurrentUserPost(userPosts);
    };
    getUserPost();
  }, []);

  const handleClose = () => {
    setCreateDialogPost(false);
  };

  const handleOpenDialog = () => {
    setCreateDialogPost(true);
  };

  return (
    <>
      <Box>
        <GlobalNavbar />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1.6}
          p="2rem 0"
          flexDirection="column"
        >
          <Box
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={isNotMobileScreen ? "3rem" : "1.5rem"}
            flexDirection={isNotMobileScreen ? "row" : "column"}
          >
            <UserImage
              image={currentUser?.profilePicturePath}
              size={isNotMobileScreen ? "100px" : "90px"}
            />
            <Box
              display={!isNotMobileScreen && "flex"}
              alignItems={!isNotMobileScreen && "center"}
              justifyContent={!isNotMobileScreen && "center"}
              flexDirection={!isNotMobileScreen && "column"}
            >
              <Typography
                color={mainText}
                fontSize={isNotMobileScreen ? "30px" : "20px"}
              >
                {currentUser?.fName} {currentUser?.lName}
              </Typography>
              <Typography
                color={lightText}
                fontSize={isNotMobileScreen ? "18px" : "15px"}
              >
                {currentUser?.occupation}
              </Typography>
              <Typography
                color={lightText}
                fontSize={isNotMobileScreen ? "18px" : "15px"}
              >
                {currentUser?.location}
              </Typography>
            </Box>
          </Box>
          <FlexBetween gap={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="0.3rem"
            >
              <Typography fontSize="18px" color={mainText}>
                {currentUser?.followers.length}
              </Typography>
              <Typography color={mainText}>Followers</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="0.3rem"
            >
              <Typography fontSize="18px" color={mainText}>
                {currentUser?.following.length}
              </Typography>
              <Typography color={mainText}>Following</Typography>
            </Box>
            {user?._id === currentUser?._id ? (
              <Button
                endIcon={<Add />}
                variant="contained"
                size="small"
                onClick={handleOpenDialog}
              >
                Post
              </Button>
            ) : (
              <>
                {user?.following.includes(currentUser?._id) ? (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleSendRequest("unFollow")}
                  >
                    Un Follow
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleSendRequest("follow")}
                  >
                    Follow
                  </Button>
                )}
              </>
            )}
          </FlexBetween>
          <Box width={isNotMobileScreen ? "50%" : "94%"}>
            <Box
              width="100%"
              maxHeight="94%"
              p={2}
              display="flex"
              gap={2}
              flexDirection="column"
              sx={{
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {currentUserPost?.length === 0 ? (
                <Box>
                  <Typography>There Is Not Any Posts</Typography>
                </Box>
              ) : (
                <>
                  {currentUserPost?.map((posts, index) => {
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
                          <UserImage
                            image={posts.userProfilePicturePath}
                            size="50px"
                          />
                          <Box>
                            <Typography
                              color={mainText}
                              fontSize={isNotMobileScreen ? "16px" : "13px"}
                            >
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
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          p="0 1rem"
                        >
                          <Typography color={mainText}>
                            {posts.description}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <CreatePostDialog open={createDialogPost} Close={handleClose} />
    </>
  );
};
