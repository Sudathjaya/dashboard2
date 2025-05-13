import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Image from "next/image";
import Chart from "../ui/Chart2";
import Chart2 from "../ui/Chart3";
import { Button, Box, Typography } from "@mui/material";

const styles = {
    searchButton: {
        width: '5.4rem',
        height: '2.1rem',
        background: '#0f9bb0',
        opacity: 0.8,
        border: 'none',
        color: 'white',
        textAlign: 'center',
        fontSize: '0.7rem',
        fontFamily: "'Poppins', sans-serif",
        fontStyle: 'normal',
        fontWeight: 500,
        cursor: 'pointer',
        borderRadius: '3px',
        textTransform: 'capitalize',
    },
    disabled: {
        width: '5.4rem',
        height: '2.1rem',
        background: '#0f9bb0',
        margin: 0,
        opacity: 0.5,
        border: 'none',
        color: 'white',
        textAlign: 'center',
        fontSize: '0.7rem',
        fontFamily: "'Poppins', sans-serif",
        fontStyle: 'normal',
        fontWeight: 500,
        cursor: 'default',
        borderRadius: '3px',
        textTransform: 'capitalize',
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)"
    },
    headerText: {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '1.2rem',
        lineHeight: '0.8rem',
        marginTop: '1rem',
        textAlign: 'center',
        color: '#000000',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subDiv: {
        width: '100%',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center'
    },
    subDiv2: {
        width: '500px',
        height: '200px',
    },
    compare: {
        display: 'flex',
        alignItems: 'center',
    },
    tdText: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '0.69rem',
        lineHeight: '1rem',
        color: '#444444',
        textAlign: 'center',
    },
    lineText: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '0.8rem',
        lineHeight: '0rem',
        color: '#444444',
    },
    box3: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    divText: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: '1.5rem',
        marginLeft: '0.5rem',
        color: '#000000',
    },
    chartText: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '0.625rem',
        lineHeight: '1rem',
        color: '#ADADAD',
        padding: 0,
        margin: 0,
    },
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));


const BootstrapDialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.any
};

export default function CustomizedDialog({ userValue, fData }: any) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        if (userValue.length > 1 && fData && userValue.length < 4) {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    let dateNow = new Date();

    return (
        <Box>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                disabled={!(userValue?.length > 1 && userValue?.length < 4)}
                sx={{
                    ...styles.searchButton,
                    "&.Mui-disabled": {
                      background: "#0f9bb0",
                      opacity: 0.5,
                      color: "white",
                      height: "33px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                    },
                  }} 
            >
                Compare
            </Button>
            <BootstrapDialog
                maxWidth="lg"
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                ></BootstrapDialogTitle>
                <DialogContent style={{ height: 500 }}>
                    <Typography sx={styles.headerText}>Compare</Typography>
                    <Box sx={styles.container}>
                        <Box sx={styles.subDiv}>
                            {userValue?.map((user: any, index: any) => (
                                <Box key={index} sx={styles.compare}>
                                    {index === 0 &&
                                        <Box sx={{ display: "flex", justifyContent: "center",}}>
                                            <Image
                                                src="/images/svg/Ellipse.svg"
                                                alt="Ellipse"
                                                width="15" height="15"
                                            />
                                        </Box>
                                    }
                                    {index === 1 && (
                                        <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "2rem", fontSize: "1rem" }}>
                                            <Image
                                                src="/images/svg/Ellipse4.svg"
                                                alt="Ellipse4"
                                                width="15" height="15"
                                            />
                                        </Box>
                                    )}
                                    {index === 2 &&
                                        <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "2rem", }}>
                                            <Image
                                                src="/images/svg/Ellipse5.svg"
                                                alt="Ellipse5"
                                                width="15" height="15"
                                            />
                                        </Box>
                                    }

                                    <Avatar
                                        alt="Remy Sharp"
                                        src={user?.avatar_url}
                                        sx={{ width: 40, height: 40, margin: 1 }}
                                    />
                                    <Typography sx={styles.lineText}>
                                        {" "}
                                        {user?.first_name}&nbsp; {user?.last_name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={styles.container}>
                        <Box sx={styles.subDiv}>
                            <Box sx={styles.subDiv2}>
                                <Box sx={styles.box3}>
                                    <Box sx={{ display: "flex", justifyContent: "center", width: "1rem", height: "1rem" }}>
                                        <Image
                                            src="/images/svg/Path.svg"
                                            alt="Path"
                                            width="15" height="15"
                                        />
                                    </Box>
                                    <Typography sx={styles.divText}>{"SPO₂"}</Typography>
                                </Box>
                                <Chart userValue={userValue} fData={fData} />
                                <Box style={{ display: "flex", justifyContent: "center" }}>
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: 400,
                                            marginLeft: 50,
                                        }}
                                    >
                                        <Typography sx={styles.chartText}>
                                            {moment(dateNow)
                                                .subtract(5, "minutes")
                                                .format("hh:mm:ss A")}
                                        </Typography>
                                        <Typography sx={styles.chartText}>
                                            {moment(dateNow)
                                                .subtract(2.5, "minutes")
                                                .format("hh:mm:ss A")}
                                        </Typography>
                                        <Typography sx={styles.chartText}>
                                            {moment(dateNow).format("hh:mm:ss A")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={styles.subDiv2}>
                                <Box sx={styles.box3}>
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={{
                                            display: "flex", justifyContent: "center",
                                            width: "1rem",
                                            height: "0.6rem",
                                            padding: 0,
                                            margin: 0,
                                        }}>
                                            <Image
                                                src="/images/svg/tt.svg"
                                                alt="tt"
                                                width="15" height="15"
                                            />
                                        </Box>
                                        <Box sx={{
                                            display: "flex", justifyContent: "center",
                                            width: "1rem", padding: 0, margin: 0
                                        }}>
                                            <Image
                                                src="/images/svg/Path1.svg"
                                                alt="Path1"
                                                width="15" height="15"
                                            />
                                        </Box>
                                    </Box>
                                    <Typography sx={styles.divText}>{"Pulse Rate"}</Typography>
                                </Box>
                                <Chart2 userValue={userValue} fData={fData} />
                                <Box style={{ display: "flex", justifyContent: "center" }}>
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: 400,
                                            marginLeft: 50,
                                        }}
                                    >
                                        <Typography sx={styles.chartText}>
                                            {moment(dateNow)
                                                .subtract(5, "minutes")
                                                .format("hh:mm:ss A")}
                                        </Typography>
                                        <Typography sx={styles.chartText}>
                                            {moment(dateNow)
                                                .subtract(2.5, "minutes")
                                                .format("hh:mm:ss A")}
                                        </Typography>
                                        <Typography sx={styles.chartText}>
                                            {moment(dateNow).format("hh:mm:ss A")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </Box>
    );
}
