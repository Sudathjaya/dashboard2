import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from '@mui/material';
  import React from 'react';
  
  interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    handleDelete: () => void;
  }
  
  const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    open,
    onClose,
    handleDelete,
  }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <h2
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              color: '#444444',
              fontSize: '20px',
            }}
          >
            Are you sure you want to delete?
          </h2>
        </DialogTitle>
  
        <DialogContent style={{ textAlign: 'center' }}>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            style={{
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontStyle: 'normal',
              backgroundColor: 'white',
              color: '#0F9BB0',
              textTransform: 'none',
              border: '2px solid',
              borderColor: '#0F9BB0',
            }}
          >
            Yes, Delete it
          </Button>
  
          <Button
            onClick={onClose}
            style={{
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontStyle: 'normal',
              backgroundColor: 'white',
              color: '#0F9BB0',
              textTransform: 'none',
              border: '2px solid',
              borderColor: '#0F9BB0',
              marginLeft: '20px',
            }}
          >
            No, keep it
          </Button>
        </DialogContent>
  
        <DialogActions />
      </Dialog>
    );
  };
  
  export default ConfirmDeleteDialog;  