"use client";
import { useRouter } from "next/navigation";
import { ROUTE_ENDPOINT } from "../../../public/const";
import { Box, Typography } from "@mui/material";
import ImageSection from "../login/ImageSection";

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
  subtitle: {
    fontSize: "2.5rem",
    lineHeight: "5.6rem",
    margin: "2rem 0 0 0",
  },
  infoText: {
    fontSize: "20px",
    margin: "5rem 0 2rem 0",
  },
  signInText: {
    fontSize: "20px",
    margin: "8rem 0",
    cursor: "pointer",
  },
  signInLink: {
    color: "#23AFC4",
    marginLeft: "10px",
    borderBottom: "1px solid #23AFC4",
  },
};

const ForgotPasswordConfirm = () => {
  const router = useRouter();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftPane}>
        <ImageSection />
      </Box>
      <Box sx={styles.rightPane}>
        <Typography variant="subtitle2" sx={styles.subtitle}>
          Reset your password
        </Typography>

        <Typography variant="subtitle2" sx={styles.infoText}>
          We have sent an email to help you reset your password.
        </Typography>

        <Typography variant="subtitle2" sx={styles.signInText}>
          Already have an account?
          <Box
            component="span"
            sx={styles.signInLink}
            onClick={() => router.push(ROUTE_ENDPOINT.LOGIN)}
          >
            Sign In
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordConfirm;
