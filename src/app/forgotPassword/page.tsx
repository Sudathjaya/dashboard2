import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageSection from "../login/ImageSection";
import ForgotPasswordForm from "./forgotPasswordForm";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: { xs: "column", md: "row" },
  },
  leftPane: {
    width: { xs: "100%", md: "44.5%" },
    backgroundColor: "#edf4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "2rem",
    textAlign: "center",
  },
  rightPane: {
    width: { xs: "100%", md: "55.5%" },
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "2rem",
    textAlign: "center",
  },
};

const ForgotPassword = () => {
  return (
    <Grid sx={styles.container}>
      <Box sx={styles.leftPane}>
        <ImageSection />
      </Box>
      <Box sx={styles.rightPane}>
        <ForgotPasswordForm />
      </Box>
    </Grid>
  );
};

export default ForgotPassword;
