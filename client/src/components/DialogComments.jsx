import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { StyledTextFeild } from "./styleTextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store";

export const DialogCommentBox = ({
  open,
  onClose,
  comments,
  postId,
  user,
  token,
}) => {
  const dispatch = useDispatch();
  const [textComment, setTextComment] = useState("");
  const handleClose = () => {
    onClose();
  };
  const handleChange = (event) => {
    let value = event.target.value;
    setTextComment(value);
  };

  const handleClick = async () => {
    await fetch(`http://localhost:3001/post/comment/${user?._id}/${postId}`, {
      method: "PUT",

      body: JSON.stringify({
        comment: textComment,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const saveAllPostsReboot = await fetch(
      `http://localhost:3001/post/allPosts`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
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
    setTextComment("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="300px">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <List
          sx={{
            maxHeight: "300px",
            maxWidth: "400px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {comments?.map((comment, index) => {
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar
                    alt="person"
                    src={`http://localhost:3001/assets/${comment.profilePicture}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography>
                      {comment.fName} {comment.lName}
                    </Typography>
                  }
                  secondary={<Typography>{comment.comment}</Typography>}
                />
              </ListItem>
            );
          })}
        </List>
        <Box p="0rem 1rem" display="flex" flexDirection="column" gap={1}>
          <StyledTextFeild
            multiline
            size="small"
            fullWidth
            label="Comment"
            name="comment"
            value={textComment}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleClick}>
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
