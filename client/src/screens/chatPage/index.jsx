import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { GlobalNavbar } from "../../components/globalNavbar";
import { UserImage } from "../../components/UserImage";
import { Welcome } from "../../components/Welcome";

import { Contacts } from "./chatWidgets/Contacts";
import { Chat_Container } from "./chatWidgets/Chat_Container";

export const Chatting = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [loader, setLoader] = useState(false);

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const setUser = async () => {
      setCurrentUser(user);
    };

    setUser();
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      const getUserContactsResponse = await fetch(
        `http://localhost:3001/user/${user?._id}/allUser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { formattingUser } = await getUserContactsResponse.json();
      setContacts(formattingUser);
    };
    getContacts();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:3001");
      socket.current.emit("add-user", currentUser?._id);
    }
  }, [currentUser]);

  const changeChat = (user) => {
    setCurrentChat(user);
    setLoader(true);
  };

  return (
    <Box>
      <GlobalNavbar />
      {!isNotMobileScreen && (
        <>
          <Box
            p="1rem 1.9rem"
            display="flex"
            gap={1}
            sx={{
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {contacts?.map((user, index) => {
              return (
                <Box key={index} onClick={() => changeChat(user)}>
                  <UserImage image={user?.profilePicturePath} />
                </Box>
              );
            })}
          </Box>
        </>
      )}
      <Box
        display="flex"
        justifyContent="center"
        gap={1}
        p={isNotMobileScreen ? "1rem 10rem" : "0.5rem"}
      >
        <Contacts contacts={contacts} changeChat={changeChat} />
        {loader ? (
          <Chat_Container
            currentUser={currentUser}
            currentChat={currentChat}
            socket={socket}
          />
        ) : (
          <Welcome />
        )}
      </Box>
    </Box>
  );
};
