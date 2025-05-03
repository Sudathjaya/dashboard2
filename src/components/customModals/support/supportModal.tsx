import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Modal } from "@mui/material";

const styles = {
  contaner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    height: 250,
    bgcolor: "background.paper",
    borderRadius: "5px",
    p: 4,
  },
  supporttModelText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#444444",
    fontSize: "20px",
    lineHeight: "0px",
    marginBottom: "4rem",
    marginTop: "2.5rem",
  },
};

const SupportModal = ({ setOpen, open }: any) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.contaner}>
          <Grid container>
            <Grid
              size={{ md: 12, xs: 12, sm: 12 }}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-1rem",
              }}
            >
              <CloseIcon
                sx={{ cursor: "pointer", color: "#444444" }}
                onClick={() => setOpen(false)}
              />
            </Grid>
            <Grid
              size={{ md: 12, xs: 12, sm: 12 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2.5rem",
              }}
            >
              <Typography sx={styles.supporttModelText}>
                Contact{" "}
                <a href="https://oxiwear.com/" rel="noreferrer" target="_blank">
                  <Typography
                    component="span"
                    sx={{ color: "#0F9BB0", textDecorationLine: "underline" }}
                  >
                    support@oxiwear.com
                  </Typography>
                </a>{" "}
                if you have any issue.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default SupportModal;
