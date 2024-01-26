import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store";
import { useNavigate } from "react-router-dom";

export const FollowersWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState(null);
  const theme = useTheme();
  const defaultBackground = theme.palette.background.default;
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getFollowers = async () => {
      const saveUserFollowersResponse = await fetch(
        `http://localhost:3001/user/followers/${user?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { formatingFollowers } = await saveUserFollowersResponse.json();
      setFollowers(formatingFollowers);
    };
    getFollowers();
  }, []);

  const handleRemoveFollowers = async (follower) => {
    const list = [...followers];
    const updateFollowersList = list.filter((id) => id._id !== follower._id);
    setFollowers(updateFollowersList);

    await fetch(
      `http://localhost:3001/user/rFollowers/${user?._id}/${follower._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    async function getUser() {
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
    }
    getUser();
  }, [followers]);

  return (
    <>
      <Box
        p={2}
        width="100%"
        maxHeight="50%"
        bgcolor={defaultBackground}
        borderRadius={2}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
        gap={2}
      >
        <Box width="100%" p="0 1.5rem">
          <Typography
            sx={{
              color: mainText,
            }}
          >
            Followers
          </Typography>
        </Box>
        <Box
          width="100%"
          justifyContent="flex-start"
          maxHeight="40%"
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <List>
            {followers?.map((follower, index) => {
              return (
                <ListItem
                  key={index}
                  onClick={() => navigate(`/profile/${follower?._id}`)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="person"
                      src={`http://localhost:3001/assets/${follower.profilePicturePath}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography color={mainText}>
                        {follower.fName} {follower.lName}
                      </Typography>
                    }
                    secondary={
                      <Typography fontSize="14px" color={lightText}>
                        {follower.occupation}
                      </Typography>
                    }
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleRemoveFollowers(follower)}
                  >
                    Remove
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </>
  );
};
