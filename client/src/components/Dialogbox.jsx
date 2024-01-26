import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DialogListBox = ({ list, open, onClose, gritting }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle color={mainText}>{gritting}</DialogTitle>
      <DialogContent dividers={true}>
        <List>
          {list?.map((item, index) => {
            return (
              <ListItem
                key={index}
                onClick={() => navigate(`/profile/${item?._id}`)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="person"
                    src={`http://localhost:3001/assets/${item.profilePicturePath}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography color={mainText}>
                      {item.fName} {item.lName}
                    </Typography>
                  }
                  secondary={
                    <Typography color={lightText}>{item.occupation}</Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};
