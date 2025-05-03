import { Box, Button } from "@mui/material";

interface ActionButtonsProps {
  onDownload: () => void;
  onCompare: () => void;
}

const styles = {
  container: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    justifyContent: { xs: "stretch", md: "flex-end" },
    flexDirection: { xs: "column", sm: "row" },
    width: { xs: "100%", md: "auto" },
  },
  downloadButton: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
    color: "#0F9BB0",
    textDecoration: "underline",
    padding: 0,
    minWidth: "auto",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
  compareButton: {
    backgroundColor: "#0F9BB0",
    color: "#FFFFFF",
    borderRadius: "3px",
    height: 35,
    fontFamily: "Poppins",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 500,
    minWidth: { xs: "100%", sm: 100 },
    textTransform: "none", // Ensure text is not transformed
    "&:hover": {
      backgroundColor: "#A0D1D5",
    },
    "&:active": {
      backgroundColor: "#8FC9D0",
    },
  },
};

export default function ActionButtons({
  onDownload,
  onCompare,
}: ActionButtonsProps) {
  return (
    <Box sx={styles.container}>
      <Button onClick={onDownload} sx={styles.downloadButton}>
        Download Report
      </Button>
      <Button variant="contained" onClick={onCompare} sx={styles.compareButton}>
        Compare
      </Button>
    </Box>
  );
}
