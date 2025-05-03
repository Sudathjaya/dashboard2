import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/Error";
const styles = {
  errorIcon: {
    marginRight: 1,
    fontSize: 16,
    color: "red",
  },
};

export const ErrorComponent = ({ error }: { error: string }) => (
  <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
    <ErrorOutlineIcon sx={styles.errorIcon} />
    <Typography component="span" variant="body2" color="error">
      {error}
    </Typography>
  </Box>
);
