import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChattingIllustrator from "../../public/chatting.png";

export const Welcome = () => {
  const isNotMobileScreen = useMediaQuery("(min-width: 900px)");
  const theme = useTheme();
  const defaultBackground = theme.palette.background.alt;
  return (
    <Box
      width="80%"
      height={isNotMobileScreen ? "85vh" : "75vh"}
      bgcolor={isNotMobileScreen ? defaultBackground : "none"}
      borderRadius={3}
      p={isNotMobileScreen ? 7 : 1}
      display="flex"
      alignItems="center"
      flexDirection={isNotMobileScreen ? "row" : "column"}
      gap={isNotMobileScreen ? "2rem" : "1rem"}
    >
      <img
        height={isNotMobileScreen ? "380px" : "250px"}
        src={ChattingIllustrator}
        alt="illustrator"
      />
      <Box>
        <Typography variant={isNotMobileScreen ? "h4" : "h5"}>
          New Era of Messaging
        </Typography>
        <Typography>you can enjoy free chat forever</Typography>
      </Box>
    </Box>
  );
};
