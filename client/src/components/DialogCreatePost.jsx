import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { StyledTextFeild } from "./styleTextField";
import { FlexBetween } from "./FlexBetween";
import { grey } from "@mui/material/colors";
import Dropzone from "react-dropzone";
import { EditOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreatePostDialog = ({ open, Close }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const createPostSchema = yup.object().shape({
    postPath: yup.string(),
    description: yup.string().required("required"),
  });

  const initialValueCreatePost = {
    postPath: "",
    description: "",
  };

  const handlePostSubmit = async (values, submitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    await fetch(`http://localhost:3001/post/${user?._id}/createPost`, {
      method: "POST",
      body: formData,
    });
    navigate("/home");
  };
  const handleClose = () => {
    Close();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Formik
            onSubmit={handlePostSubmit}
            validationSchema={createPostSchema}
            initialValues={initialValueCreatePost}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
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
                      setFieldValue("postPath", acceptedfile[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()} p="1rem ">
                        <input {...getInputProps()} />
                        {!values.postPath ? (
                          <Typography
                            sx={{
                              color: grey[500],
                            }}
                          >
                            Add post here
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography
                              sx={{
                                color: "primary.main",
                              }}
                            >
                              {values.postPath.name}
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
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  gap={2}
                >
                  <StyledTextFeild
                    size="small"
                    multiline
                    variant="outlined"
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{
                      input: { color: "primary.main" },
                    }}
                  />
                  <Button type="submit" variant="contained" fullWidth>
                    Create
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};
