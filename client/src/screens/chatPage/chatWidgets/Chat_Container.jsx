import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { StyledTextFeild } from "../../../components/styleTextField";
import { UserImage } from "../../../components/UserImage";
import { v4 as uuidv4 } from "uuid";
import { Send } from "@mui/icons-material";

export const Chat_Container = ({ currentUser, currentChat, socket }) => {
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [input, setInput] = useState("");
  const [projectingMsg, setProjectingMsg] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const theme = useTheme();
  const defaultBackground = theme.palette.background.alt;
  const Msg = theme.palette.primary.main;

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getCurrentChat = async () => {
      const saveCurrentChatResponse = await fetch(
        `http://localhost:3001/chat/getMsg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            from: currentUser?._id,
            to: currentChat?._id,
          }),
        }
      );

      const { projectedMessage } = await saveCurrentChatResponse.json();
      setProjectingMsg(projectedMessage);
    };
    getCurrentChat();
  }, [currentChat]);

  const handleClick = async () => {
    socket.current.emit("send-msg", {
      from: currentUser?._id,
      to: currentChat?._id,
      message: input,
    });

    const msgs = [...projectingMsg];
    msgs.push({ fromSelf: true, message: input });
    setProjectingMsg(msgs);

    await fetch(`http://localhost:3001/chat/addMsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        from: currentUser?._id,
        to: currentChat?._id,
        message: input,
      }),
    }).then(setInput(""));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setProjectingMsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [projectingMsg]);

  return (
    <Box
      width="85%"
      height={isNotMobileScreen ? "85vh" : "75vh"}
      bgcolor={defaultBackground}
      borderRadius={3}
      p={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={2}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <UserImage
          image={currentChat?.profilePicturePath}
          size={isNotMobileScreen ? "60px" : "50px"}
        />
        <Typography fontSize={!isNotMobileScreen && "16px"}>
          {currentChat?.fName} {currentChat?.lName}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        p={2}
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {projectingMsg?.map((msg) => {
          return (
            <Box
              key={uuidv4()}
              ref={scrollRef}
              width="100%"
              borderRadius={2}
              display="flex"
              justifyContent={msg?.fromSelf ? "flex-end" : "flex-start"}
            >
              <Typography
                p={isNotMobileScreen ? 2 : 1}
                bgcolor={msg?.fromSelf ? Msg : Msg}
                borderRadius={2}
                maxWidth="50%"
                fontSize={!isNotMobileScreen && 13}
              >
                {msg.message}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <StyledTextFeild
          multiline
          size="small"
          label="Message"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            width: isNotMobileScreen ? "100%" : "80%",
          }}
          variant="outlined"
        />
        {isNotMobileScreen ? (
          <Button onClick={handleClick} variant="contained">
            Send
          </Button>
        ) : (
          <IconButton onClick={handleClick}>
            <Send />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
