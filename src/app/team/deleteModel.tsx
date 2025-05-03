import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const style = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 250,
    bgcolor: "background.paper",
    borderRadius: "5px",
    p: 4,
  },
  deleteModelText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "0px",
  },
};

interface AlertState {
  showAlert: boolean;
  severity: "success" | "error";
  message: string;
}

interface BasicModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  group: string;
  setAlert: (alert: AlertState) => void;
  loadDataGroupData: () => void;
  setDeleteTeam: (deleteTeam: boolean) => void;
  deleteGroup: (group: string) => void;
}

const BasicModal: React.FC<BasicModalProps> = ({
  setOpen,
  open,
  group,
  setAlert,
  loadDataGroupData,
  setDeleteTeam,
  deleteGroup,
}) => {
  const handleClose = () => setOpen(false);

  const deleteTeam = async () => {
    try {
      deleteGroup(group);
      loadDataGroupData();
      handleClose();
      setAlert({
        showAlert: true,
        severity: "success",
        message: "Team deleted successfully!",
      });
      setDeleteTeam(true);

      setTimeout(() => {
        setAlert({
          showAlert: false,
          severity: "success",
          message: "Team deleted successfully!",
        });
      }, 5000);
    } catch {
      setAlert({
        showAlert: true,
        severity: "error",
        message: "Something went wrong!",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.container}>
        <Grid container>
          <Grid
            size={{ md: 12, sm: 12, xs: 12 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={style.deleteModelText}
              style={{ fontWeight: "600" }}
            >
              Are you sure you want to delete
            </Typography>
          </Grid>
          <Grid
            size={{ md: 12, sm: 12, xs: 12 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
              marginBottom: "4rem",
            }}
          >
            <Typography
              variant="h5"
              sx={style.deleteModelText}
              style={{ fontWeight: "600" }}
            >
              this team?
            </Typography>
          </Grid>
          <Grid
            size={{ md: 6, sm: 12, xs: 12 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              fullWidth
              size="large"
              onClick={deleteTeam}
              style={{
                fontSize: "0.9rem",
                fontFamily: "Poppins",
                fontWeight: 300,
                width: 130,
                height: 45,
                backgroundColor: "#77D0D1",
                color: "black",
                textTransform: "none",
              }}
            >
              Yes, delete it
            </Button>
          </Grid>
          <Grid
            size={{ md: 6, sm: 12, xs: 12 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              fullWidth
              size="large"
              onClick={handleClose}
              style={{
                fontSize: "0.9rem",
                fontFamily: "Poppins",
                fontWeight: 300,
                width: 130,
                height: 45,
                backgroundColor: "#77D0D1",
                color: "black",
                textTransform: "none",
              }}
            >
              No, stay here
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BasicModal;
