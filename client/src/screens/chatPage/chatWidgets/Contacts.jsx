import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { UserImage } from "../../../components/UserImage";

export const Contacts = ({ contacts, changeChat }) => {
  const theme = useTheme();
  const defaultBackground = theme.palette.background.alt;
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const handleChatChange = (user) => {
    changeChat(user);
  };

  return (
    <>
      {isNotMobileScreen && (
        <>
          <Box
            minWidth="240px"
            height="85vh"
            p="20px"
            display="flex"
            flexDirection="column"
            gap="1.3rem"
            bgcolor={defaultBackground}
            borderRadius={3}
            sx={{
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Typography fontSize="20px">Your Contacts</Typography>
            {contacts?.map((user, index) => {
              return (
                <Box
                  key={index}
                  p="10px"
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleChatChange(user)}
                >
                  <UserImage image={user?.profilePicturePath} />
                  <Typography>
                    {user?.fName} {user?.lName}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </>
  );
};
