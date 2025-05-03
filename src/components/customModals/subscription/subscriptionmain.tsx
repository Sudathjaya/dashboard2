import * as z from "zod";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import type { AlertState } from "@/types/interfaces";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutSubscription from "./checkOutSubscription";
import {
  Button,
  DialogContent,
  Snackbar,
  Dialog,
  Box,
  Alert,
  Typography,
} from "@mui/material";

const styles = {
  SubscriptionsText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#000000",
    fontSize: "20px",
    margin: "0 0 1rem 0",
  },
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
  TopBorder: {
    textAlign: "center",
    border: "3px solid #DDFAF7",
    borderRadius: "0.5rem",
    minWidth: "20rem",
  },
  NormalBorder: {
    textAlign: "center",
    boxShadow: "0.5px 0.5px 0.5px 0.5px #E8E7E7",
    border: "1px solid #FFFFFF",
    borderRadius: "0.5rem",
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  NormalBorderClicked: {
    textAlign: "center",
    boxShadow: "0.5px 0.5px 0.5px 0.5px #E8E7E7",
    border: "1px solid #FFFFFF",
    borderRadius: "0.5rem",
    cursor: "pointer",
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  MarkBorder: {
    textAlign: "center",
    boxShadow: "0.5px 0.5px 0.5px 0.5px #E8E7E7",
    border: "1px solid #FFFFFF",
    borderRadius: "0.5rem",
    backgroundColor: "#DDFAF7",
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  TextBold: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#444444",
    fontSize: "17px",
  },
  TextBlue: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    color: "#0F9BB0",
    fontSize: "17px",
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

interface FormValues {
  numberOfPlayers: number;
}

const PlayersSchema = z.object({
  numberOfPlayers: z
    .number({
      required_error: "Required",
      invalid_type_error: "Number only",
    })
    .positive("Invalid"), // ensures value > 0
});

const SubscriptionMainModal = ({ open, setOpen }: any) => {
  const [initialValues, setInitialValues] = useState({ numberOfPlayers: 1 });
  const [addMore, setAddMore] = useState(false);
  const [process, setProcess] = useState(false);
  const [blueColorIndex, setBlueColorIndex] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [playersCount, setPlayersCount] = useState(1);
  const [year, setYear] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    showAlert: false,
    severity: "success",
    message: "",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(PlayersSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    handleCalculate(playersCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blueColorIndex, year]);

  const handleProcess = () => {
    setInitialValues({ numberOfPlayers: playersCount });
    setProcess(true);
  };

  const onSubmit = () => {
    // Handle form submission
    handleProcess();
  };

  const handleClose = () => {
    setAddMore(false);
    setProcess(false);
    setOpen(false);
    setAlert({
      showAlert: false,
      severity: "success",
      message: "",
    });
  };

  const handleChangePlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === "" ? 0 : Number(value);
    setValue("numberOfPlayers", numValue, { shouldValidate: true });
    setPlayersCount(numValue);

    if (numValue < 0) {
      setBlueColorIndex(0);
      handleCalculate(numValue);
      setYear(false);
    } else if (value === "") {
      setBlueColorIndex(0);
      handleCalculate(0);
      setYear(false);
    } else if (numValue < 26) {
      setBlueColorIndex(50);
      handleCalculate(numValue);
    } else if (numValue < 51) {
      setBlueColorIndex(47.5);
      handleCalculate(numValue);
    } else if (numValue < 101) {
      setBlueColorIndex(45);
      handleCalculate(numValue);
    } else if (numValue < 201) {
      setBlueColorIndex(40);
      handleCalculate(numValue);
    } else if (numValue > 200) {
      setBlueColorIndex(35);
      handleCalculate(numValue);
    } else {
      setBlueColorIndex(0);
      handleCalculate(numValue);
      setYear(false);
    }
  };

  const handleClick = () => {
    if (year) {
      setYear(false);
    } else {
      setYear(true);
    }
  };

  const handleCalculate = (count: number) => {
    if (year) {
      setTotalCount(blueColorIndex * count * 10);
    } else {
      setTotalCount(blueColorIndex * count);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      maxWidth="md"
      fullWidth
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid size={{ md: 12, sm: 12, xs: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon
            style={{ cursor: "pointer", margin: "0.3rem" }}
            onClick={() => handleClose()}
          />
        </Box>
      </Grid>
      <DialogContent style={{ margin: "0 2rem 0 2rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {process ? (
            <CheckoutSubscription
              setProcess={setProcess}
              totalPrice={totalCount}
              playersCount={playersCount}
              year={year}
              paymentPlan={blueColorIndex}
            />
          ) : (
            <Grid size={{ md: 12, sm: 12, xs: 12 }} container>
              <Grid size={{ md: 12, sm: 12, xs: 12 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={styles.SubscriptionsText}>
                    Extra Player Pricing
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ md: 12, sm: 12, xs: 12 }}>
                <Box sx={styles.TopBorder}>
                  <Grid size={{ md: 12, sm: 12, xs: 12 }} container>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>Players</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>1 - 25</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>26 - 50</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>51 - 100</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>101 - 200</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>200 +</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid size={{ md: 12, sm: 12, xs: 12 }} container>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>Monthly</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 50 && !year
                            ? styles.MarkBorder
                            : !year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (year ? handleClick() : null)}
                      >
                        <Typography>$50</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 47.5 && !year
                            ? styles.MarkBorder
                            : !year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (year ? handleClick() : null)}
                      >
                        <Typography>$47.5</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 45 && !year
                            ? styles.MarkBorder
                            : !year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (year ? handleClick() : null)}
                      >
                        <Typography>$45</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 40 && !year
                            ? styles.MarkBorder
                            : !year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (year ? handleClick() : null)}
                      >
                        <Typography>$40</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 35 && !year
                            ? styles.MarkBorder
                            : !year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (year ? handleClick() : null)}
                      >
                        <Typography>$35</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid size={{ md: 12, sm: 12, xs: 12 }} container>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box sx={styles.NormalBorder}>
                        <Typography sx={styles.TextBold}>Yearly</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 50 && year
                            ? styles.MarkBorder
                            : year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (!year ? handleClick() : null)}
                      >
                        <Typography>$500</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 47.5 && year
                            ? styles.MarkBorder
                            : year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (!year ? handleClick() : null)}
                      >
                        <Typography>$475</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 45 && year
                            ? styles.MarkBorder
                            : year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (!year ? handleClick() : null)}
                      >
                        <Typography>$450</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 40 && year
                            ? styles.MarkBorder
                            : year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (!year ? handleClick() : null)}
                      >
                        <Typography>$400</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      size={{ md: 2, sm: 2, xs: 2 }}
                      style={{ padding: "1px" }}
                    >
                      <Box
                        sx={
                          blueColorIndex === 35 && year
                            ? styles.MarkBorder
                            : year
                              ? styles.NormalBorder
                              : styles.NormalBorderClicked
                        }
                        onClick={() => (!year ? handleClick() : null)}
                      >
                        <Typography>$350</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  {addMore ? (
                    <Grid size={{ md: 12, sm: 12, xs: 12 }} container>
                      <Grid
                        size={{ md: 6, sm: 6, xs: 6 }}
                        style={{ padding: "1px" }}
                      >
                        <Box
                          sx={{
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid size={{ md: 9, sm: 9, xs: 9 }} container>
                            <Grid size={{ md: 3, sm: 3, xs: 3 }}>
                              <Typography sx={styles.TextBlue}>Add</Typography>
                            </Grid>
                            <Grid size={{ md: 5, sm: 5, xs: 5 }}>
                              <Controller
                                name="numberOfPlayers"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="number"
                                    style={{
                                      fontFamily: "Poppins",
                                      width: "100%",
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                    }}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleChangePlayers(e);
                                    }}
                                  />
                                )}
                              />
                              {errors.numberOfPlayers && (
                                <Typography
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    margin: "4px 0 0",
                                  }}
                                >
                                  {errors.numberOfPlayers.message}
                                </Typography>
                              )}
                            </Grid>
                            <Grid size={{ md: 4, sm: 4, xs: 4 }}>
                              <Typography sx={styles.TextBlue}>
                                players
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid
                        size={{ md: 6, sm: 6, xs: 6 }}
                        style={{ padding: "1px" }}
                      >
                        <Box
                          sx={{
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid size={{ md: 8, sm: 8, xs: 8 }} container>
                            <Grid
                              size={{ md: 8, sm: 8, xs: 8 }}
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Typography sx={styles.TextBlue}>
                                Amount Due :{" "}
                              </Typography>
                            </Grid>
                            <Grid size={{ md: 4, sm: 4, xs: 4 }}>
                              <Typography sx={styles.TextBlue}>
                                $ {totalCount}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      size={{ md: 12, sm: 12, xs: 12 }}
                      container
                      justifyContent="center"
                    >
                      <Box
                        sx={{
                          height: 100,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Grid size={{ md: 10, sm: 10, xs: 10 }}>
                          <Typography sx={styles.TextBlue}>
                            Your current plan contains 25 players
                          </Typography>
                        </Grid>
                        <Grid size={{ md: 2, sm: 2, xs: 2 }}>
                          <Button
                            fullWidth
                            size="large"
                            onClick={() => setAddMore(true)}
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
                            Add More
                          </Button>
                        </Grid>
                      </Box>
                    </Grid>
                  )}
                </Box>
                <Grid
                  size={{ md: 12, sm: 12, xs: 12 }}
                  container
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem 0 1rem 0",
                  }}
                >
                  {addMore ? (
                    <Button
                      fullWidth
                      size="large"
                      disabled={!isValid}
                      type="submit"
                      style={
                        isValid
                          ? {
                              fontSize: "0.9rem",
                              lineHeight: "1.25rem",
                              fontFamily: "Poppins",
                              fontWeight: 400,
                              fontStyle: "normal",
                              width: 100,
                              height: 40,
                              backgroundColor: "#0F9BB0",
                              color: "white",
                              textTransform: "none",
                            }
                          : {
                              fontSize: "0.9rem",
                              lineHeight: "1.25rem",
                              fontFamily: "Poppins",
                              fontWeight: 400,
                              fontStyle: "normal",
                              width: 100,
                              opacity: 0.5,
                              height: 40,
                              backgroundColor: "#0F9BB0",
                              color: "white",
                              textTransform: "none",
                            }
                      }
                    >
                      Proceed
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          )}
        </form>
        <Grid size={{ md: 12, sm: 12, xs: 12 }}>
          <Snackbar
            open={alert.showAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity={alert.severity} onClose={handleClose}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionMainModal;
