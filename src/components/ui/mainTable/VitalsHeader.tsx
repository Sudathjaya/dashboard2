import Image from "next/image";
import { Box, Typography } from "@mui/material";

const styles = {
  Checkbox: {
    display: "flex",
    alignItems: "center",
    marginLeft: "11px",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "15.79px",
  },
  deviceCount: {
    ml: "4px",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
  spo2Line: {
    color: "#313131",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 300,
    marginRight: "5px",
  },
  vitals: {
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
  tittle3: {
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export const VitalsHeader = () => (
  <Box sx={styles.tittle3}>
    <Typography sx={styles.vitals}>Vitals</Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "25px" }}>
        <Image
          src="/images/svg/lineSpO2.svg"
          alt="SPO2 Line"
          width={12}
          height={3}
          style={{ marginRight: 4 }}
        />
        <Typography variant="body2" sx={styles.spo2Line}>
          SPO<sub>2</sub>(%)
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/images/heartRateLine.png"
          alt="Heart Rate Line"
          width={12}
          height={3}
          style={{ marginRight: 4 }}
        />
        <Typography variant="body2" sx={styles.spo2Line}>
          Heart Rate (bpm)
        </Typography>
      </Box>
    </Box>
  </Box>
);
