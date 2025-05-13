import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Checkbox,
  styled,
  Alert,
  IconButton,
  Typography,
  Autocomplete
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import moment from "moment";
import ConfirmDeleteDialog from "./confirm-delete";
import { useSession } from "next-auth/react";
import { TEXTS } from "../../../public/const";
import { addJournal, deleteJournal } from "@/services/dashboardService";
import { getProfile } from "@/services/userService";
import { getTeamPlayersAll } from "@/services/teamService";
import { Group } from "@/types/interfaces";
import { ErrorComponent } from "@/common/common";

const CustomColorCheckbox = styled(Checkbox)(() => ({
  color: "#23AFC4",
  '&.Mui-checked': {
    color: "#23AFC4",
  },
}));

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  note: z.string().min(1, "Note is required"),
  group_id: z.any().optional(),
  player_id: z.any().optional(),
});

type FormValues = z.infer<typeof noteSchema>;

type AlertState = {
  message: string | null;
  showAlert: boolean;
  severity: "error" | "warning" | "info" | "success";
};

const styles = {
  baseSaveButtonStyle: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "normal",
    width: "136px",
    height: "35px",
    borderRadius: "4px",
    padding: "10px 20px",
    gap: "10px",
    textTransform: "capitalize" as const,
  },
  deleteButtonStyle: {
    textTransform: "none",
    color: "#23afc4",
    fontFamily: "Poppins",
    fontStyle: "medium",
    fontSize: "14px",
    borderColor: "#23afc4",
  },
  autoSelect: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#23AFC4',
  },
  seperator: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '35px',
    color: '#23AFC4',
  },
  addTitleLabel: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
    color: '#808080',
  },
  labelText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
    color: '#808080',
  },
  dateText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.06em',
    color: 'rgba(0, 0, 0, 0.5)',
    marginTop: '2.6rem',
    marginBottom: '2.6rem',
  },
  makePublic: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0F9BB0',
    paddingLeft: '5px',
  },
};

export default function JournalAddNote({ getJournalData, selectedDate, noteDetails, readJournal, setReadJournal, setOpen, open }: any) {
  const [groups, setGroups] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [checked, setChecked] = useState(false);
  const [userNameClicked, setUserNameClicked] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ showAlert: false, severity: "success", message: "" });

  const { data: session, status } = useSession();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      note: "",
      group_id: undefined,
      player_id: undefined,
    },
    mode: "onChange",
  });

  const groupValue = watch("group_id");
  const playerValue = watch("player_id");
  const isDisabled = !isValid || (!groupValue && !playerValue) || loading;

  const handleClose = () => {
    setReadJournal(false);
    setOpen(false);
    setChecked(false);
    reset();
  };

  const handleClickOpen = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDelete = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await deleteJournal(session?.user?.accessToken, noteDetails.id);
        getJournalData();
        setOpenDelete(false);
        handleClose();
      }
    } catch {
      setAlert({ showAlert: true, severity: "error", message: "Note deletion failed!" });
    }
  };

  const loadData = async () => {
    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      try {
        const { data } = await getProfile(session.user.accessToken);
        const response = await getTeamPlayersAll(session.user.accessToken);
        const mapped = response.data.data.map((p: any) => ({
          ...p,
          name: `${p.first_name} ${p.last_name || ""}`,
        }));
        setPlayers(mapped);
        if (data?.data) {
          const groups: Group[] = data.data.groups ?? [];
          setGroups(groups);
        }
        return { mapped, groups: data?.data?.groups || [] };
      } catch (err) {
        console.error("Loading data failed", err);
      }
    }
    return { mapped: [], groups: [] };
  };

  useEffect(() => {
    if (!open) return;

    const initialize = async () => {
      const { mapped: playersData, groups: groupsData } = await loadData();
      setPlayers(playersData);
      setGroups(groupsData);

      if (readJournal && noteDetails) {
        const selectedPlayer = playersData.find((p: any) => p.user_id === noteDetails.player_id);
        const selectedGroup = groupsData.find((g) => g.id === noteDetails.group_id);
        console.log('--selectedPlayer--', selectedPlayer);

        setUserNameClicked(selectedPlayer?.name || "");
        reset({
          title: noteDetails.title,
          note: noteDetails.note,
          group_id: selectedGroup || undefined,
          player_id: selectedPlayer || undefined,
        });
        if (noteDetails.visibility === "group") {
          setChecked(true);
        }
      } else {
        reset({
          title: "",
          note: "",
          group_id: undefined,
          player_id: undefined,
        });
      }
    };

    initialize();
  }, [open, readJournal, noteDetails]);

  const submit = async (values: FormValues) => {
    setLoading(true);
    const data: any = {
      reading_time: moment(selectedDate).format("YYYY-MM-DD HH:mm"),
      title: values.title,
      note: values.note,
      is_group_note: !!values.group_id,
      visibility: checked ? "group" : "private",
      group_id: values.group_id?.id || values.player_id?.team_id,
      player_id: values.group_id ? null : values.player_id?.user_id,
    };

    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await addJournal(session.user.accessToken, data);
        getJournalData();
        setAlert({ showAlert: true, severity: "success", message: "Note saved successfully!" });
        setTimeout(() => {
          setAlert({ showAlert: false, severity: "success", message: "" });
          handleClose();
        }, 3000);
      }
    } catch (err) {
      setAlert({ showAlert: true, severity: "error", message: "Note sending failed!" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="flex" p={2}>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
        <form onSubmit={handleSubmit(submit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <Box display="flex" alignItems="center">
                  <CustomColorCheckbox checked={checked} onChange={(e) => setChecked(e.target.checked)} disabled={readJournal} />
                  <Typography sx={styles.makePublic}>{!readJournal ? "Make this public" : "Public"}</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                {!readJournal && (
                  <Controller
                    name="group_id"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={groups}
                        getOptionLabel={(option) => option?.name || ""}
                        isOptionEqualToValue={(o, v) => o?.id === v?.id}
                        onChange={(_, data) => field.onChange(data)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={
                              <Typography sx={styles.autoSelect}>Pick Team</Typography>
                            }
                            variant="outlined"
                            size="small"
                            error={!!errors.group_id}
                            sx={styles.autoSelect}
                          />
                        )}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item md="auto">
                {!readJournal && <Typography sx={styles.seperator}>Or</Typography>}
              </Grid>
              <Grid item md={4} xs={12}>
                {userNameClicked || !readJournal && (
                  <Controller
                    name="player_id"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={players}
                        getOptionLabel={(option) => option?.name || ""}
                        isOptionEqualToValue={(o, v) => o?.user_id === v?.user_id}
                        onChange={(_, data) => field.onChange(data)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={
                              <Typography sx={styles.autoSelect}>
                                {!readJournal
                                  ? "Pick Patient"
                                  : userNameClicked}
                              </Typography>
                            }
                            variant="outlined"
                            size="small"
                            error={!!errors.player_id}
                            sx={styles.autoSelect}
                          />
                        )}
                        disabled={readJournal}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={styles.addTitleLabel}
                      fullWidth
                      size="small"
                      label="Add Title"
                      variant="standard"
                      disabled={readJournal}
                      error={!!errors.title}
                      helperText={errors.title && <ErrorComponent error={errors.title.message || ""} />}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={styles.dateText}>
                  {moment(selectedDate).format("dddd, MMMM DD, YYYY").toUpperCase()}
                  <span style={{ marginLeft: "2rem" }}>{moment(selectedDate).format("h:mm:ss A")}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={10}
                      size="small"
                      label={!readJournal ? "Take a note..." : "Note"}
                      sx={styles.labelText}
                      variant="standard"
                      disabled={readJournal}
                      error={!!errors.note}
                      helperText={errors.note && <ErrorComponent error={errors.note.message || ""} />}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {!readJournal && (
              <Button
                type="submit"
                variant="contained"
                disabled={isDisabled}
                style={
                  isDisabled
                    ? {
                      ...styles.baseSaveButtonStyle,
                      background: "#0F9BB0",
                      opacity: 0.5,
                      color: "#ffffff",
                    }
                    : alert.showAlert
                      ? {
                        ...styles.baseSaveButtonStyle,
                        backgroundColor: "#0F9BB0",
                        color: "#0F9BB0",
                        border: "2px solid #0F9BB0",
                      }
                      : {
                        ...styles.baseSaveButtonStyle,
                        background: "#23AFC4",
                        color: "#ffffff",
                      }
                }
              >
                {alert.showAlert ? "Saved" : loading ? "Saving..." : "Save"}
              </Button>
            )}

            {readJournal && (
              <Box style={{ textAlign: "center", width: "100%" }}>
                <Button variant="outlined" sx={styles.deleteButtonStyle} onClick={handleClickOpen}>
                  Delete
                </Button>
              </Box>
            )}
          </DialogActions>
          {alert.showAlert && (
            <Box px={3} pb={2}><Alert severity={alert.severity}>{alert.message}</Alert></Box>
          )}
        </form>
      </Dialog>

      <ConfirmDeleteDialog open={openDelete} onClose={handleCloseDelete} handleDelete={handleDelete} />
    </>
  );
}