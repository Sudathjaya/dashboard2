"use client";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LoginForm from "./login/LoginForm";
import ImageSection from "./login/ImageSection";

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

const HomePage = () => {
  return (
    <Grid sx={styles.container}>
      <Box sx={styles.leftPane}>
        <ImageSection />
      </Box>
      <Box sx={styles.rightPane}>
        <LoginForm />
      </Box>
    </Grid>
  );
};

export default HomePage;
