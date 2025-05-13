import { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Alert,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    Button,
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { TEXTS } from '@/public/const';
import { inviteTeam } from '@/services/teamService';

const styles = {
    searchButton: {
        width: '117px',
        height: '48px',
        background: '#23afc4',
        borderRadius: '4px',
        margin: '5px',
        padding: '10px 20px',
        gap: '10px',
        border: 'none',
        color: 'white',
        textAlign: 'center' as const,
        fontSize: '0.87rem',
        fontFamily: "'Poppins', sans-serif",
        fontStyle: 'normal' as const,
        fontWeight: 500,
        cursor: 'pointer' as const,
        textTransform: 'capitalize' as const,
    },

    disabled: {
        width: '117px',
        height: '48px',
        background: '#f5f5f5',
        opacity: 0.5,
        borderRadius: '4px',
        margin: '5px',
        padding: '10px 20px',
        gap: '10px',
        border: 'none',
        color: '#000000',
        textAlign: 'center' as const,
        fontSize: '0.87rem',
        fontFamily: "'Poppins', sans-serif",
        fontStyle: 'normal' as const,
        fontWeight: 500,
        cursor: 'pointer' as const,
        textTransform: 'capitalize' as const,
    },
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props: { [x: string]: any; children: any; onClose: any; player: any; setPlayer: any; }) => {
    const { children, onClose, player, setPlayer, ...other } = props;

    const handleChange = (event: { target: { value: any; }; }) => {
        setPlayer(event.target.value);
    };

    return (
        <DialogTitle sx={{ m: 0, p: 1 }} {...other} style={{ backgroundColor: '#56E4D7' }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={player}
                    onChange={handleChange}
                    placeholder="Language"
                    style={{
                        backgroundColor: '#0F9BB0', color: '#ffffff'
                    }}
                >
                    <MenuItem value="">
                        <em>PickPlayer</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 15,
                        top: 5,
                        color: '#585858',
                    }}
                >
                    <CloseIcon style={{ fontSize: '2.5rem', fontWeight: 100 }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

type AlertState = {
    message: string | null;
    showAlert: boolean;
    severity: "error" | "warning" | "info" | "success";
};

export default function AddUser() {
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState('');
    const { data: session, status } = useSession();
    const initialValue =
        '<p>Take a note.....</p>';
    const [value, onChange] = useState(initialValue);
    const [alert, setAlert] = useState<AlertState>({ showAlert: false, severity: "success", message: "" });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addJuernal = async () => {
        try {
            if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
                await inviteTeam(session?.user?.accessToken, {});
                setAlert({
                    showAlert: true,
                    severity: 'success',
                    message: 'Note Successfully added!',
                });
                setTimeout(() => {
                    setAlert({
                        showAlert: false,
                        severity: 'success',
                        message: 'Note Successfully added!',
                    });
                    handleClose();
                }, 5000);
            }
        } catch (e) {
            setAlert({
                showAlert: true,
                severity: 'error',
                message: 'Server error!',
            });
            setTimeout(() => {
                setAlert({
                    showAlert: false,
                    severity: 'error',
                    message: 'Server error!',
                });
            }, 5000);
        }
    }


    return (
        <div>
            <div
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={handleClickOpen}
            >
                <Image
                    src="/images/svg/plus.svg"
                    width={16}
                    height={16}
                    onClick={() => setOpen(true)}
                    alt="Add Note"
                    style={{ cursor: "pointer" }}
                />
            </div>
            <BootstrapDialog
                maxWidth='sm'
                fullWidth
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
            >
                <BootstrapDialogTitle
                    id='customized-dialog-title'
                    onClose={handleClose}
                    player={player}
                    setPlayer={setPlayer} children={undefined}></BootstrapDialogTitle>
                <DialogContent style={{ paddingTop: '1rem' }}>

                    {/* <RichText value={value} onChange={onChange}/> */}

                    {alert.showAlert && (
                        <div style={{ padding: '0.5rem 2rem' }}>
                            <Alert
                                severity={alert.severity}
                                onClose={() =>
                                    setAlert({
                                        ...alert,
                                        showAlert: false,
                                    })
                                }
                            >
                                {alert.message}
                            </Alert>
                        </div>
                    )}


                    <Box sx={{ backgroundColor: "" }}>
                        <Button
                            variant="contained"
                            onClick={addJuernal}
                            disabled={value === "<p>Take a note.....</p>"}
                            sx={styles.searchButton}
                        >
                            Save
                        </Button>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
