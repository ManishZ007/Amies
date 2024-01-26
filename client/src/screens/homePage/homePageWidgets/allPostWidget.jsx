import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../../../store";
import { UserImage } from "../../../components/UserImage";
import { DialogCommentBox } from "../../../components/DialogComments";
import {
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  FavoriteRounded,
  InsertCommentOutlined,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export const AlllPostWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;
  const allPosts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const isNotMobileScreen = useMediaQuery("(min-width: 800px)");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const [currentPostId, setCurrentPostId] = useState("");

  const token = useSelector((state) => state.token);

  const handleLikePost = async (postId) => {
    await fetch(`http://localhost:3001/post/like/${user?._id}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const saveAllPostsReboot = await fetch(
      `http://localhost:3001/post/allPosts`,
      {
        method: "GET",
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { posts } = await saveAllPostsReboot.json();

    dispatch(
      setPosts({
        posts,
      })
    );
  };
  useEffect(() => {
    const getAllPost = async () => {
      const saveAllPostResponse = await fetch(
        `http://localhost:3001/post/allPosts`,
        {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { posts } = await saveAllPostResponse.json();

      dispatch(
        setPosts({
          posts,
        })
      );
    };
    getAllPost();
  }, []);

  const handleOpenCommentBox = (comment, postId) => {
    setCurrentPostId(postId);
    setComment(comment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
      {allPosts?.map((posts, index) => {
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
              <Typography color={mainText}>{posts.description}</Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                {posts.likes.includes(user?._id) ? (
                  <IconButton onClick={() => handleLikePost(posts._id)}>
                    <FavoriteRounded
                      sx={{
                        color: red[900],
                      }}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleLikePost(posts._id)}>
                    <FavoriteBorderRounded />
                  </IconButton>
                )}
                <Typography>{posts.likes.length}</Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                position: "relative",
                top: "-17px",
                left: "7px",
              }}
            >
              <IconButton
                onClick={() => handleOpenCommentBox(posts.comments, posts._id)}
              >
                <InsertCommentOutlined />
              </IconButton>
              <Typography>{posts.comments.length}</Typography>
            </Box>
          </Box>
        );
      })}
      <DialogCommentBox
        open={open}
        onClose={handleClose}
        comments={comment}
        postId={currentPostId}
        user={user}
        token={token}
      />
    </Box>
  );
};
