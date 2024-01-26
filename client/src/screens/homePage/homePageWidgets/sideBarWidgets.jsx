import { Box, Typography, useTheme, Grid, styled } from "@mui/material";
import {
  PersonRounded,
  PersonAddAlt1Rounded,
  ThumbUpRounded,
  CommentRounded,
  AllInclusive,
  Home,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../store";
import { UserImage } from "../../../components/UserImage";
import { DialogListBox } from "../../../components/Dialogbox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideBarWidgets = ({ user }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const [open, setOpen] = useState(false);
  const [requirestType, setRequirestType] = useState("followers");
  const [list, setList] = useState(null);

  const navigate = useNavigate();

  const theme = useTheme();
  const defaultBackground = theme.palette.background.default;
  const altBackground = theme.palette.background.alt;
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;

  const DialogButton = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "0.5rem",
    cursor: "pointer",
    marginBottom: "25px",
    textAlign: "center",
  });

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await fetch(
        `http://localhost:3001/user/${user?._id}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { currentUser } = await userResponse.json();
      const userReboot = currentUser;

      dispatch(
        setUser({
          user: userReboot,
        })
      );
    };
    getUser();
  }, [list]);

  const handleClickOpen = (reqType) => async () => {
    if (reqType === "followers") {
      const saveFollowersResponse = await fetch(
        `http://localhost:3001/user/followers/${user?._id}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { formatingFollowers } = await saveFollowersResponse.json();
      setList(formatingFollowers);
    } else if (reqType === "following") {
      const saveFollowingResponse = await fetch(
        `http://localhost:3001/user/following/${user?._id}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { formatingFollowing } = await saveFollowingResponse.json();
      setList(formatingFollowing);
    } else if (reqType === "likePost") {
      const saveLikePostResponse = await fetch(
        `http://localhost:3001/post/getLikePost/${user?._id}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { allLikePost } = await saveLikePostResponse.json();
    } else if (reqType === "commentPost") {
      const saveCommentPostResponse = await fetch(
        `http://localhost:3001/post/getCommentPost/${user?._id}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { allCommentPost } = await saveCommentPostResponse.json();
    }

    setRequirestType(reqType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="2rem"
      height="100vh"
      maxWidth="350px"
      bgcolor={altBackground}
    >
      {/* Logo */}

      <Box textAlign="center">
        <AllInclusive
          sx={{
            fontSize: "30px",
            color: "#0063f1",
          }}
        />

        <Typography
          fontSize="20px"
          color={mainText}
          sx={{
            fontFamily: "Yeseva One",
            fontWeight: "600",
          }}
        >
          Amies
        </Typography>
        <Typography fontSize="15px" color={lightText} sx={{}}>
          Social Media Platform
        </Typography>
      </Box>
      <Box
        width="70%"
        borderRadius="10px"
        p="1rem"
        bgcolor={defaultBackground}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="0.5rem"
        onClick={() => navigate(`/profile/${user?._id}`)}
        sx={{
          cursor: "pointer",
        }}
      >
        <UserImage image={user?.profilePicturePath} />
        <Typography color={mainText} fontSize="17px">
          {user?.fName} {user?.lName}
        </Typography>
        <Typography
          color={lightText}
          fontSize="13px"
          sx={{
            position: "relative",
            top: "-9px",
          }}
        >
          {user?.occupation}
        </Typography>
        <Box
          display="flex"
          p="1rem"
          gap="1rem"
          sx={{
            position: "relative",
            top: "-8px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap="0.3rem"
          >
            <Typography fontSize="18px" color={mainText}>
              {user?.followers.length}
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
              {user?.following.length}
            </Typography>
            <Typography color={mainText}>Following</Typography>
          </Box>
        </Box>
      </Box>
      <Box width="60%" p="1rem">
        <Grid container>
          <Grid item xs={6}>
            <DialogButton onClick={() => navigate("/home")}>
              <Home
                sx={{
                  color: lightText,
                  fontSize: "25px",
                }}
              />
              <Typography color={lightText} fontSize="13px">
                Home
              </Typography>
            </DialogButton>
          </Grid>
          <Grid item xs={6}>
            <DialogButton onClick={handleClickOpen("followers")}>
              <PersonRounded
                sx={{
                  color: lightText,
                  fontSize: "25px",
                }}
              />
              <Typography color={lightText} fontSize="13px">
                Followers
              </Typography>
            </DialogButton>
          </Grid>
          <Grid item xs={6}>
            <DialogButton onClick={handleClickOpen("following")}>
              <PersonRounded
                sx={{
                  color: lightText,
                  fontSize: "25px",
                }}
              />
              <Typography color={lightText} fontSize="13px">
                Following
              </Typography>
            </DialogButton>
          </Grid>
          <Grid item xs={6}>
            <DialogButton>
              <PersonAddAlt1Rounded
                sx={{
                  color: lightText,
                  fontSize: "25px",
                }}
              />
              <Typography color={lightText} fontSize="13px">
                Explore
              </Typography>
            </DialogButton>
          </Grid>
          <Grid item xs={6}>
            <DialogButton onClick={() => navigate("/activity/like")}>
              <ThumbUpRounded
                sx={{
                  color: lightText,
                  fontSize: "25px",
                }}
              />
              <Typography color={lightText} fontSize="13px">
                Like Post
              </Typography>
            </DialogButton>
          </Grid>
          <Grid item xs={6}>
            <DialogButton onClick={() => navigate("/activity/comment")}>
              <CommentRounded
                sx={{
                  color: lightText,
                  fontSize: "25px",
                }}
              />

              <Typography color={lightText} fontSize="13px">
                Comment Post
              </Typography>
            </DialogButton>
          </Grid>
        </Grid>
      </Box>
      <DialogListBox
        list={list}
        gritting={requirestType}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
};
