import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

const styles = {
modalStyle : {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 250,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  p: 4,
},
logOutModelText: {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 400,
  color: '#444444',
  fontSize: '20px',
  lineHeight: '0px',
  marginBottom: '4rem',
  marginTop: '2.5rem'
}
}

interface LogOutModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const LogOutModal = ({ open, setOpen, handleLogout }: LogOutModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={styles.modalStyle}>
        <Grid container justifyContent="center">
          <Grid size={{ md: 12, xs: 12, sm: 12 }} sx={{ display: 'flex', justifyContent: 'center', mt: '2px' }}>
            <Typography sx={styles.logOutModelText}>
              Are you sure you want to log out of your account?
            </Typography>
          </Grid>

          <Grid container size={{ md: 8, xs: 8, sm: 8 }} spacing={2} justifyContent="center">
            <Grid size={{ md: 6, xs: 6, sm: 6 }} display="flex" justifyContent="center">
              <Button
                fullWidth
                size="large"
                onClick={handleLogout}
                sx={{
                  fontSize: '0.9rem',
                  lineHeight: '1.25rem',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  width: 150,
                  height: 50,
                  bgcolor: 'white',
                  color: '#0F9BB0',
                  textTransform: 'none',
                  border: '2px solid #0F9BB0',
                }}
              >
                Yes, log out
              </Button>
            </Grid>
            <Grid size={{ md: 6, xs: 6, sm: 6 }} display="flex" justifyContent="center">
              <Button
                fullWidth
                size="large"
                onClick={() => setOpen(false)}
                sx={{
                  fontSize: '0.9rem',
                  lineHeight: '1.25rem',
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  width: 150,
                  height: 50,
                  bgcolor: '#0F9BB0',
                  color: 'white',
                  textTransform: 'none',
                }}
              >
                No, stay here
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LogOutModal;
