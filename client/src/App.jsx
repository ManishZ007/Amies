import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSetting } from "./theme";
import { createTheme } from "@mui/material";

import { Home } from "./screens/homePage";
import { LoginPage } from "./screens/loginPage";
import { ProfilePage } from "./screens/profilePage";
import { Chatting } from "./screens/chatPage";
import { Activity } from "./screens/activityPage";

export const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);
  const Auth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={Auth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:Id"
              element={Auth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/chat"
              element={Auth ? <Chatting /> : <Navigate to="/" />}
            />
            <Route
              path="/activity/:option"
              element={Auth ? <Activity /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};
