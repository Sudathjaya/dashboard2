import Grid from "@mui/material/Grid2";
import { Button, Box, Typography } from "@mui/material";

const styles = {
  BackText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#0F9BB0",
    textDecoration: "underline",
    fontSize: "17px",
    margin: "0 0 1rem 0",
    cursor: "pointer",
  },

  checkoutTopText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    color: "#444444",
    fontSize: "17px",
    textAlign: "center",
  },
  checkoutText1: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    color: "#0F9BB0",
    fontSize: "17px",
    textAlign: "center",
  },
  checkoutText3: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#0F9BB0",
    fontSize: "15px",
    textAlign: "center",
  },
  checkoutText2: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#000000",
    fontSize: "15px",
    textAlign: "center",
  },
};
const CheckoutSubscription = ({
  setProcess,
  totalPrice,
  playersCount,
  year,
  paymentPlan,
}: any) => {
  return (
    <Grid size={{ md: 12, sm: 12, xs: 12 }} container>
      <Grid size={{ md: 1, sm: 1, xs: 1 }}>
        <Typography sx={styles.BackText} onClick={() => setProcess(false)}>
          Back
        </Typography>
      </Grid>
      <Grid size={{ md: 12, sm: 12, xs: 12 }}>
        <Box sx={{ height: 250, display: "flex", alignItems: "flex-end" }}>
          <Grid
            size={{ md: 12, sm: 12, xs: 12 }}
            container
            justifyContent="center"
          >
            <Box
              sx={{
                width: 500,
                height: 200,
                backgroundColor: "#E9F1F1",
                border: "2px solid #0F9BB0",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid size={{ md: 6, sm: 6, xs: 6 }}>
                <Typography sx={styles.checkoutTopText}>
                  Subscription Addition
                </Typography>
                <Typography sx={styles.checkoutText1}>
                  ${year ? paymentPlan * 10 : paymentPlan}/per player
                </Typography>
                <Typography sx={styles.checkoutText2}>
                  Date:{" "}
                  <Typography component="span" sx={styles.checkoutText3}>
                    Oct 5, 2022 - March 4, 2022
                  </Typography>
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Box>
        <Typography sx={styles.checkoutText2}>
          ${year ? paymentPlan * 10 : paymentPlan} x{" "}
          <Typography component="span" sx={styles.checkoutText3}>
            {playersCount} players
          </Typography>{" "}
          x{" "}
          <Typography component="span" sx={styles.checkoutText3}>
            {year ? "1 year" : "1 month"}
          </Typography>
        </Typography>
      </Grid>
      <Grid
        size={{ md: 12, sm: 12, xs: 12 }}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Grid size={{ md: 3, sm: 3, xs: 3 }}>
          <Typography sx={styles.checkoutTopText}>
            = Total:{" "}
            <Typography component="span" sx={styles.checkoutText1}>
              ${totalPrice}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        size={{ md: 12, sm: 12, xs: 12 }}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Grid
          size={{ md: 3, sm: 3, xs: 3 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ height: 70 }}>
            <Button
              fullWidth
              size="large"
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.25rem",
                fontFamily: "Poppins",
                fontWeight: 500,
                fontStyle: "normal",
                width: 100,
                height: 40,
                backgroundColor: "#0F9BB0",
                color: "white",
                textTransform: "none",
              }}
            >
              Check out
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutSubscription;
