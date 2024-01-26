import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import loginIllustrator from "../../../public/Login.png";
import registerIllustrator from "../../../public/Sign Up.png";
import * as yup from "yup";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { FlexBetween } from "../../components/FlexBetween.jsx";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { setLogIn, setUser } from "../../../store.js";
import { useNavigate } from "react-router-dom";
import { StyledTextFeild } from "../../components/styleTextField.jsx";

export const LoginPage = () => {
  const [pageType, setPageType] = useState("Login");
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";
  const isNotMobileScreen = useMediaQuery("(min-width: 850px)");
  const theme = useTheme();
  const { paper } = theme.palette.background;
  // const altBackground = theme.palette.background.alt;
  const mainText = theme.palette.neutral.main;
  const subtitleText = theme.palette.neutral.subtitle;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSchema = yup.object().shape({
    fName: yup.string().required("required"),
    lName: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    profilePicture: yup.string(),
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().min(5).required("required"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().min(5).required("required"),
  });

  const registerIntialState = {
    fName: "",
    lName: "",
    location: "",
    occupation: "",
    profilePicture: "",
    email: "",
    password: "",
  };

  const loginInitialState = {
    email: "",
    password: "",
  };

  const login = async (values, submitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    submitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogIn({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  const register = async (values, submitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const saveRegisterResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    const savedUser = await saveRegisterResponse.json();
    submitProps.resetForm();

    if (savedUser) {
      setPageType("Login");
    }
  };

  const handleFormSubmit = async (values, submitProps) => {
    if (isLogin) await login(values, submitProps);
    if (isRegister) await register(values, submitProps);
  };

  return (
    <>
      <Box>
        <Box
          minHeight="100vh"
          bgcolor={paper}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={isNotMobileScreen ? "0rem" : "2rem 0rem"}
        >
          <Box
            // bgcolor={mainText}
            // height="140vh"

            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={isNotMobileScreen ? "row" : "column"}
            gap={isNotMobileScreen ? "2rem" : "0.7rem"}
          >
            <Box display="flex" flexDirection="column" gap="0.7rem">
              {!isNotMobileScreen && (
                <Typography color={mainText} mx="40px" fontSize="25px">
                  {isLogin ? "Login" : "Register"}
                </Typography>
              )}

              <img
                height={isNotMobileScreen ? "480px" : "350px"}
                src={isLogin ? loginIllustrator : registerIllustrator}
                alt="illustrator"
              />
              {isNotMobileScreen && (
                <>
                  <Typography
                    mx="40px"
                    fontSize="20px"
                    color={mainText}
                    sx={{
                      position: "relative",
                      top: "-20px",
                    }}
                  >
                    {isLogin ? "Login" : "Register"}
                  </Typography>
                  <Typography
                    maxWidth="400px"
                    fontSize="14px"
                    mx="40px"
                    sx={{
                      position: "relative",
                      top: "-17px",
                      color: grey[500],
                    }}
                  >
                    {isLogin
                      ? "Welcome Back! To keep connected with us login with your personal information by email and password"
                      : "By signing up, you'r agree to our Terms & Conditions and Privacy Policy"}
                  </Typography>
                </>
              )}
            </Box>
            <Formik
              validationSchema={isLogin ? loginSchema : registerSchema}
              initialValues={isLogin ? loginInitialState : registerIntialState}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    width={isNotMobileScreen ? "320px" : "270px"}
                    display="grid"
                    gap="1rem"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNotMobileScreen ? undefined : "span 4",
                      },
                    }}
                  >
                    {isRegister && (
                      <>
                        <StyledTextFeild
                          variant="outlined"
                          label="First Name"
                          name="fName"
                          value={values.fName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            Boolean(touched.fName) && Boolean(errors.fName)
                          }
                          helperText={touched.fName && errors.fName}
                          sx={{
                            input: { color: "primary.main" },
                            gridColumn: "span 2",
                          }}
                        />
                        <StyledTextFeild
                          variant="outlined"
                          label="Last Name"
                          name="lName"
                          value={values.lName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            Boolean(touched.lName) && Boolean(errors.lName)
                          }
                          helperText={touched.lName && errors.lName}
                          sx={{
                            input: { color: "primary.main" },
                            gridColumn: "span 2",
                          }}
                        />
                        <StyledTextFeild
                          variant="outlined"
                          label="Location"
                          name="location"
                          value={values.location}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            Boolean(touched.location) &&
                            Boolean(errors.location)
                          }
                          helperText={touched.location && errors.location}
                          sx={{
                            input: { color: "primary.main" },
                          }}
                        />
                        <StyledTextFeild
                          variant="outlined"
                          label="Occupation"
                          name="occupation"
                          value={values.occupation}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            Boolean(touched.occupation) &&
                            Boolean(errors.occupation)
                          }
                          helperText={touched.occupation && errors.occupation}
                          sx={{
                            input: { color: "primary.main" },
                          }}
                        />
                        {
                          <Box
                            gridColumn="span 4"
                            borderRadius="5px"
                            my="10px"
                            sx={{
                              border: `1px solid ${grey[700]}`,
                            }}
                          >
                            <Dropzone
                              acceptedfile=".jpg,.jpeg,.png"
                              multiple={false}
                              onDrop={(acceptedfile) => {
                                setFieldValue(
                                  "profilePicture",
                                  acceptedfile[0]
                                );
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <Box {...getRootProps()} p="1rem ">
                                  <input {...getInputProps()} />
                                  {!values.profilePicture ? (
                                    <Typography
                                      sx={{
                                        color: grey[500],
                                      }}
                                    >
                                      Add picture here
                                    </Typography>
                                  ) : (
                                    <FlexBetween>
                                      <Typography
                                        sx={{
                                          color: "primary.main",
                                        }}
                                      >
                                        {values.profilePicture.name}
                                      </Typography>
                                      <EditOutlined
                                        sx={{
                                          color: "primary.main",
                                        }}
                                      />
                                    </FlexBetween>
                                  )}
                                </Box>
                              )}
                            </Dropzone>
                          </Box>
                        }
                      </>
                    )}
                    <StyledTextFeild
                      variant="outlined"
                      label="Email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{
                        input: { color: "primary.main" },
                      }}
                    />
                    <StyledTextFeild
                      variant="outlined"
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                      sx={{
                        input: { color: "primary.main" },
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      marginTop: "20px",
                      // width: "270px",
                    }}
                    type="submit"
                  >
                    {isLogin ? "LOGIN" : "REGISTER"}
                  </Button>
                  <Typography
                    textAlign="center"
                    my="20px"
                    color={subtitleText}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setPageType(pageType === "Login" ? "Register" : "Login");
                      resetForm();
                    }}
                  >
                    {isLogin
                      ? `New to Amies? Register `
                      : `Joined us before? Login `}
                  </Typography>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};
