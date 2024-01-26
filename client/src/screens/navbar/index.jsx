import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import {
  Search,
  ChatOutlined,
  DarkMode,
  LightMode,
  AllInclusive,
  Menu,
  Close,
  ForumRounded,
} from "@mui/icons-material";
import { StyledTextFeild } from "../../components/styleTextField";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut, setUser } from "../../../store";
import { useEffect, useState } from "react";
import { MobileNavbar } from "../../components/mobileNavbar";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNotMobileScreen = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const mode = theme.palette.mode;
  const mainText = theme.palette.neutral.main;
  const lightText = theme.palette.neutral.light;

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

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

  const handleClose = () => {
    console.log("hello");
  };

  useEffect(() => {
    const getUser = async () => {
      const saveGetUserResponse = await fetch(
        `http://localhost:3001/user/${user?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { currentUser } = await saveGetUserResponse.json();
      dispatch(
        setUser({
          user: currentUser,
        })
      );
    };

    getUser();
  }, []);

  // Work on this project
  useEffect(() => {
    const handleWidthResponse = () => {
      if (window.innerWidth <= 800) {
        setMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleWidthResponse);
  }, []);

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {isNotMobileScreen ? (
          <>
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

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="1rem"
            >
              <IconButton onClick={() => navigate("/chat")}>
                <ForumRounded />
              </IconButton>

              <IconButton onClick={() => dispatch(setMode())}>
                {mode === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
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
                    <MenuItem
                      color={mainText}
                      key={index}
                      value={opetion.value}
                    >
                      {opetion.label}
                    </MenuItem>
                  ))}
                </StyledTextFeild>
              </Box>
            </Box>
          </>
        ) : (
          <>
            {/* Logo */}
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
      <MobileNavbar open={mobileMenu} onClose={handleClose} />
    </>
  );
};
