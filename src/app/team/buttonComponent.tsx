import React, { useState } from "react";
import DeleteModel from "./deleteModel";
import { Box, Button } from "@mui/material";

interface AlertState {
  showAlert: boolean;
  severity: "success" | "error";
  message: string;
}

interface ButtonComponentProps {
  isValid: boolean;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  group: string;
  setAlert: (alert: AlertState) => void;
  loadDataGroupData: () => void;
  userValue: any[];
  initialValues: {
    teamName: string;
    category_id?: string | null;
    name?: string;
  };
  setOpenMessage: (open: boolean) => void;
  setDeleteTeam: (deleteTeam: boolean) => void;
  updateData: () => void;
  deleteGroup: (group: string) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  isValid,
  edit,
  setEdit,
  group,
  setAlert,
  loadDataGroupData,
  userValue,
  /*eslint-disable-next-line*/
  initialValues,
  setOpenMessage,
  setDeleteTeam,
  updateData,
  deleteGroup,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleModelOpen = () => {
    setOpen(true);
  };

  const updateTeam = async () => {
    try {
      updateData();
      loadDataGroupData();
      setEdit(false);
      setAlert({
        showAlert: true,
        severity: "success",
        message: "Team updated successfully!",
      });
      setOpenMessage(true);

      setTimeout(() => {
        setAlert({
          showAlert: false,
          severity: "success",
          message: "Team updated successfully!",
        });
      }, 5000);
    } catch (error: any) {
      setAlert({
        showAlert: true,
        severity: "error",
        message: error.response?.data?.message || "Something went wrong!",
      });
      setOpenMessage(true);
    }
  };

  return (
    <>
      <DeleteModel
        setOpen={setOpen}
        open={open}
        group={group}
        setAlert={setAlert}
        loadDataGroupData={loadDataGroupData}
        setDeleteTeam={setDeleteTeam}
        deleteGroup={deleteGroup}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "baseline",
          height: "124px",
        }}
      >
        {group === "default" ? (
          <Button
            fullWidth
            disabled={!(isValid && userValue?.length > 0)}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            style={{
              fontSize: "0.9rem",
              fontFamily: "Poppins",
              fontWeight: 500,
              width: 80,
              height: 35,
              color: "white",
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        ) : group !== "" ? (
          !edit ? (
            <>
              <Button
                color="primary"
                fullWidth
                onClick={() => setEdit(true)}
                size="large"
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  width: 80,
                  textTransform: "capitalize",
                  border: "2px solid",
                  marginRight: "0.5rem",
                }}
              >
                Edit
              </Button>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                size="large"
                onClick={handleModelOpen}
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  width: 80,
                  textTransform: "capitalize",
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                fullWidth
                onClick={() => setEdit(false)}
                size="large"
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  width: 80,
                  height: 35,
                  textTransform: "capitalize",
                  border: "2px solid",
                  marginRight: "0.5rem",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={updateTeam}
                disabled={!(isValid && userValue?.length > 0)}
                size="large"
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  width: 80,
                  height: 35,
                  textTransform: "capitalize",
                }}
              >
                Save
              </Button>
            </>
          )
        ) : null}
      </Box>
    </>
  );
};

export default ButtonComponent;
