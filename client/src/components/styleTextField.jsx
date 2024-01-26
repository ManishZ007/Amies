import { TextField, styled } from "@mui/material";

export const StyledTextFeild = styled(TextField)({
  "& label": {
    color: "gray",
  },
  "&:hover label": {
    fontWeight: 700,
  },
  "& label.Mui-focused": {
    color: "primary.main",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "gray",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "gray",
      borderWidth: 1,
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
  gridColumn: "span 4",
});
