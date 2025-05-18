import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  TextField,
  Alert,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { TEXTS } from '@/public/const';
import { addJournal } from '@/services/dashboardService';
import { getTeamPlayersAll } from '@/services/teamService';

const styles = {
  makePublic: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0F9BB0',
    paddingLeft: '5px',
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
};

const NoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Maximum length for the title is 60.'),
  note: z.string().min(1, 'Note is required').max(255, 'Maximum length for the note is 255.'),
  is_group_note: z.boolean(),
  visibility: z.enum(['private', 'group']),
  display_date: z.string(),
  reading_time: z.string(),
});

type NoteForm = z.infer<typeof NoteSchema>;

interface AddPrivateNoteProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  players_id: any;
}

const AddPrivateNote: React.FC<AddPrivateNoteProps> = ({ setOpen, open, players_id }) => {
  const selectedDate = new Date();
  const { data: session, status } = useSession();
  const coachName = session?.user.name;
  const [group_ID, setGroup_ID] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState({ showAlert: false, severity: 'success', message: '' });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<NoteForm>({
    resolver: zodResolver(NoteSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      note: '',
      is_group_note: false,
      visibility: 'private',
      display_date: '',
      reading_time: '',
    },
  });

  useEffect(() => {
    if (open) {
      loadData();
      const d = new Date();
      const readDate = d.toDateString().split(' ').join(', ') + ' ' + d.toLocaleTimeString();
      const reading_time = d.toISOString().split('T')[0] + ' ' + d.toISOString().split('T')[1];
      setValue('display_date', readDate);
      setValue('reading_time', reading_time);
    }
  }, [open]);

const loadData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      const res = await getTeamPlayersAll(session.user.accessToken);      
        const group_id = res?.data?.data?.filter(((item: { user_id: any; }) => item?.user_id === players_id))[0]?.team_id;
        setGroup_ID(group_id)
      }
    } catch (error) {
        console.log(error)
    }
};


  const handleClose = () => {
    setOpen(false);
    setChecked(false);
};

  const onSubmit = async (values: NoteForm) => {
    setLoading(true);
    const payload = {
      reading_time: moment(selectedDate).format('YYYY-MM-DD HH:mm'),
      title: values.title,
      note: values.note,
      is_group_note: false,
      visibility: checked ? 'group' : 'private',
      player_id: players_id,
      group_id: group_ID,
    };
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await addJournal(session.user.accessToken, payload);
        setAlert({ showAlert: true, severity: "success", message: "Note saved successfully!" });
        setTimeout(() => {
          setAlert({ showAlert: false, severity: "success", message: "" });
          handleClose();
        }, 3000);
      }
    } catch {
      setAlert({ showAlert: true, severity: 'error', message: 'Note sending failed!' });
      setTimeout(() => {
        setAlert({ showAlert: false, severity: 'error', message: '' });
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'right', pr: 4, pt: 4 }}>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '0 2.5rem 2.5rem 2.5rem' }}>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ md: 3, xs: 3, sm: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                label={<Typography sx={styles.makePublic}>Make this public</Typography>}
              />
            </Grid>
            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Add Title" error={!!errors.title} helperText={errors.title?.message} sx={styles.addTitleLabel} />
                )}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ md: 5, xs: 5, sm: 5 }}>
                <Typography sx={styles.dateText}>{moment(selectedDate).format('dddd, MMMM DD, YYYY').toUpperCase()} <span style={{ marginLeft: '2rem' }}>{moment(selectedDate).format('h:mm:ss A')}</span></Typography>
              </Grid>
              <Grid size={{ md: 7, xs: 7, sm: 7 }}>
                <Typography sx={styles.dateText}>Written by {coachName}</Typography>
              </Grid>
            </Grid>
            <Grid size={{ md: 12, xs: 12, sm: 12 }}>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Take a note..." multiline rows={10} error={!!errors.note} helperText={errors.note?.message} sx={styles.labelText} />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || loading}
            sx={
              alert.showAlert
                ? {
                    backgroundColor: 'white',
                    color: '#0F9BB0',
                    border: '2px solid #0F9BB0',
                    textTransform: 'capitalize',
                  }
                : {
                    backgroundColor: '#23AFC4',
                    color: 'white',
                    textTransform: 'capitalize',
                  }
            }
          >
            {alert.showAlert ? 'Saved' : loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>

        {alert.showAlert ? (
          <Box px={4} pt={1}>
            <Alert severity={alert.severity as any} onClose={() => setAlert({ ...alert, showAlert: false })}>
              {alert.message}
            </Alert>
          </Box>
        ) : (
          <Box sx={{ height: '1.3rem' }} />
        )}
      </form>
    </Dialog>
  );
};

export default AddPrivateNote;