import { Box, Button, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TEXTS } from "@/public/const";
import { useSession } from "next-auth/react";
import { deleteUserById } from "@/services/userService";

const styles = {
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
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "0px",
  },
};
const DeleteUserModal = (data: any) => {
  const { setOpen, open, id, setAlert, loadData } = data;
  const handleClose = () => setOpen(false);
  const { data: session, status } = useSession();

  const deleteUser = async (id: string) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await deleteUserById(session.user.accessToken, id);
        loadData();
        setOpen(false);
        setAlert({
          showAlert: true,
          severity: "success",
          message: "User Successfully Deleted!",
        });
      }
    } catch (e: any) {
      setAlert({
        showAlert: true,
        severity: "error",
        message: e?.response?.data?.message,
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.container}>
          <Grid container>
            <Grid
              size={{ md: 12, xs: 12, sm: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "12px",
                marginBottom: "20px",
              }}
            >
              <Typography sx={styles.deleteModelText}>
                Are you sure you want to delete
              </Typography>
            </Grid>
            <Grid
              size={{ md: 12, xs: 12, sm: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "12px",
                marginBottom: "4rem",
              }}
            >
              <Typography sx={styles.deleteModelText}>this user?</Typography>
            </Grid>
            <Grid
              size={{ md: 6, xs: 6, sm: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                fullWidth
                size="large"
                onClick={() => deleteUser(id)}
                sx={{
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                  fontFamily: "Poppins",
                  fontWeight: 300,
                  fontStyle: "normal",
                  width: 130,
                  height: 45,
                  backgroundColor: "#77D0D1",
                  color: "black",
                  textTransform: "none",
                }}
              >
                Yes,delete it
              </Button>
            </Grid>
            <Grid
              size={{ md: 6, xs: 6, sm: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                fullWidth
                size="large"
                onClick={() => handleClose()}
                sx={{
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                  fontFamily: "Poppins",
                  fontWeight: 300,
                  fontStyle: "normal",
                  width: 130,
                  height: 45,
                  backgroundColor: "#77D0D1",
                  color: "black",
                  textTransform: "none",
                }}
              >
                No,stay here
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteUserModal;
