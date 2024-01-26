import {
  Box,
  Typography,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  AllInclusive,
  DarkMode,
  ForumRounded,
  Home,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { StyledTextFeild } from "./styleTextField";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut, setMode } from "../../store";
import { useState } from "react";
import { MobileNavbar } from "./mobileNavbar";
import { useNavigate } from "react-router-dom";

export const GlobalNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNotMobileScreen = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const mode = theme.palette.mode;
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;

  const [mobileMenu, setMobileMenu] = useState(false);

  const { fName, lName } = useSelector((state) => state.user);

  const selectTextFiledValues = [
    {
      value: "userName",
      label: `${fName} ${lName}`,
    },
    {
      value: "log out",
      label: "Log out",
    },
  ];

  const handleValueChange = (e) => {
    var value = e.target.value;
    if (value === "log out") {
      dispatch(setLogOut());
    }
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        {isNotMobileScreen ? (
          <>
            <Box
              display="flex"
              gap={2.4}
              alignItems="center"
              justifyContent="center"
            >
              <AllInclusive
                sx={{
                  fontSize: "30px",
                  color: "#0063f1",
                }}
              />{" "}
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
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <IconButton onClick={() => navigate("/home")}>
                <Home />
              </IconButton>

              <IconButton onClick={() => navigate("/chat")}>
                <ForumRounded />
              </IconButton>
              <IconButton onClick={() => dispatch(setMode())}>
                {mode === "dark" ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <StyledTextFeild
                select
                defaultValue="userName"
                size="small"
                onChange={handleValueChange}
              >
                {selectTextFiledValues.map((opetion, index) => (
                  <MenuItem color={mainText} key={index} value={opetion.value}>
                    {opetion.label}
                  </MenuItem>
                ))}
              </StyledTextFeild>
            </Box>
          </>
        ) : (
          <>
            <Box
              display="flex"
              gap="0.7rem"
              alignItems="center"
              justifyContent="center"
            >
              <AllInclusive
                sx={{
                  fontSize: "25px",
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
            </Box>
            <IconButton
              sx={{
                color: mainText,
              }}
              onClick={() => {
                setMobileMenu(mobileMenu === true ? false : true);
              }}
            >
              {mobileMenu ? <Close /> : <Menu />}
            </IconButton>
          </>
        )}
      </Box>
      <MobileNavbar open={mobileMenu} />
    </>
  );
};
