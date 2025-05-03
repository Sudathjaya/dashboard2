import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ImageSection = () => (
  <Grid>
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
      <Image
        src="/images/svg/poweredBy.svg"
        alt="PoweredBy"
        width="52"
        height="10"
      />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Image
        src="/images/svg/oxiWareLogo.svg"
        alt="Oxy1"
        width="234"
        height="55"
      />
      <Image src="/images/svg/TEAM.svg" alt="Team2" width="60" height="14" />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Image
        src="/images/oxiWareDevice.png"
        alt="logo"
        width="310"
        height="310"
      />
    </Box>
    <Typography variant="h6" sx={{ margin: "4rem 0", fontSize: "1.56rem" }}>
      Monitor your team health
    </Typography>
  </Grid>
);

export default ImageSection;
