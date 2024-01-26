import {
  Box,
  Typography,
  useTheme,
  InputAdornment,
  Button,
  styled,
  IconButton,
} from "@mui/material";
import {
  CommentRounded,
  DarkMode,
  ForumRounded,
  HomeRounded,
  LightMode,
  LogoutRounded,
  PersonAddAlt1Rounded,
  PersonRounded,
  Search,
  ThumbUpRounded,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { StyledTextFeild } from "./styleTextField";
import { FlexBetween } from "./FlexBetween";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut, setMode } from "../../store";
import { UserImage } from "./UserImage";
import { blue } from "@mui/material/colors";

export const MobileNavbar = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;
  const defaultBackground = theme.palette.background.default;
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const NavbarButton = styled(Button)({
    justifyContent: "flex-start",
    padding: "0.3rem 1rem",
    color: lightText,
  });

  return (
    <>
      <Box
        zIndex={10}
        p={2}
        width="100%"
        height="92vh"
        right={open ? "0" : "100%"}
        sx={{
          position: "absolute",
          transition: "0.5s",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={defaultBackground}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          gap="1.5rem"
          width="350px"
        >
          <StyledTextFeild
            size="small"
            id="input-with-icon-textfield"
            label="Search"
            sx={{
              input: { color: mainText },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    sx={{
                      color: mainText,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <FlexBetween
            sx={{
              width: "78%",
            }}
            flexDirection="column"
            alignItems="start"
            gap="1.7rem"
            p={1}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<HomeRounded />}
              sx={{
                justifyContent: "flex-start",
              }}
              onClick={() => navigate("/home")}
            >
              HOME
            </Button>

            <NavbarButton
              fullWidth
              variant="text"
              startIcon={<PersonRounded />}
              onClick={() => navigate(`/profile/${user?._id}`)}
            >
              PROFILE
            </NavbarButton>
            <NavbarButton
              fullWidth
              variant="text"
              startIcon={<PersonAddAlt1Rounded />}
            >
              EXPLORE
            </NavbarButton>
            <NavbarButton
              fullWidth
              variant="text"
              startIcon={<ThumbUpRounded />}
              onClick={() => navigate("/activity/like")}
            >
              LIKE POST
            </NavbarButton>

            <NavbarButton
              fullWidth
              variant="text"
              startIcon={<CommentRounded />}
              onClick={() => navigate("/activity/comment")}
            >
              COMMENT POST
            </NavbarButton>
            <NavbarButton
              fullWidth
              variant="text"
              startIcon={<ForumRounded />}
              onClick={() => navigate("/chat")}
            >
              Chat
            </NavbarButton>
          </FlexBetween>
          <Box
            border={`1px solid ${blue[900]}`}
            borderRadius={1}
            sx={{
              width: "75%",
            }}
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={1}
          >
            <Box
              width="100%"
              p={1}
              justifyContent="flex-start"
              alignItems="center"
              display="flex"
              gap={2}
            >
              <UserImage image={user?.profilePicturePath} size="50px" />
              <Box>
                <Typography fontSize={14} color={mainText}>
                  {user?.fName} {user?.lName}
                </Typography>
                <Typography fontSize={11} color={lightText}>
                  {user?.occupation}
                </Typography>
              </Box>
              <IconButton
                sx={{
                  color: mainText,
                }}
                onClick={() => dispatch(setMode())}
              >
                {mode === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
            <Box width="100%" p={1} justifyContent="flex-start" display="flex">
              <Button
                size="small"
                sx={{
                  justifyContent: "flex-start",
                  padding: "0.3rem 1rem",
                  color: mainText,
                }}
                fullWidth
                variant="text"
                startIcon={<LogoutRounded />}
                onClick={() => dispatch(setLogOut())}
              >
                Log out
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
