import dayjs, { Dayjs } from "dayjs";
import { Box, Paper } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import CircleIcon from "@mui/icons-material/Circle";

const styles = {
  container: {
    height: "100%",
    backgroundColor: "#FFF",
    fontSize: "1rem",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
  },
  calender1: {
    backgroundColor: "#C4EDE7",
    borderRadius: "4px",
  },
  calender2: {},
  calendar: {
    width: "100%",
    maxWidth: "400px",
    "& .MuiPickersCalendarHeader-root": {
      paddingLeft: "35px",
      paddingRight: "22px",
    },
    "& .MuiDayCalendar-header": {
      "& .MuiTypography-root": {
        color: "#444444",
        fontSize: "14px",
        fontWeight: 400,
        width: "45px",
        height: "40px",
        margin: "2px",
        fontFamily: "Poppins",
      },
    },
    "& .MuiPickersArrowSwitcher-root": {
      "& .MuiIconButton-root": {
        color: "rgb(115, 115, 115)",
      },
    },
    "& .MuiDayCalendar-weekContainer": {
      margin: "0px 0",
    },
    "& .MuiPickersDay-root": {
      color: "#444444",
      fontSize: "14px",
      fontWeight: 400,
      width: "45px",
      height: "40px",
      margin: "2px",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#D3D3D3",
      },
    },
    "& .Mui-selected": {
      backgroundColor: "#C4EDE7 !important",
      color: "#000000 !important",
      "&:hover": {
        backgroundColor: "rgba(0, 123, 255, 0.25)",
      },
    },
    "& .MuiPickersDay-dayOutsideMonth": {
      color: "rgb(185, 185, 185)",
    },
    "& .MuiPickersYear-yearButton": {
      color: "#444444",
    },
  },
};

interface MainCalendarProps {
  selectedDays: string[];
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  isTabView: boolean;
}

const CustomDay = (
  props: PickersDayProps<Dayjs> & { selectedDays: string[] },
) => {
  const { day, outsideCurrentMonth, selectedDays, ...other } = props;
  const selectDate = day.format("YYYY-MM-DD");
  const isSelected = selectedDays.includes(selectDate);
  const isInCurrentMonth = !outsideCurrentMonth;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(isSelected && isInCurrentMonth
          ? styles.calender1
          : styles.calender2),
      }}
    >
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
      />
      {isSelected && isInCurrentMonth && (
        <CircleIcon
          sx={{
            fontSize: "0.2rem",
            color: "black",
            padding: 0,
            position: "absolute",
            bottom: 2,
          }}
        />
      )}
    </Box>
  );
};

const MainCalendar = ({
  selectedDays,
  date,
  setDate,
  isTabView,
}: MainCalendarProps) => {
  const dynamicStyles = {
    "& .MuiPickersDay-root": {
      color: "#444444",
      fontSize: "14px",
      fontWeight: 400,
      margin: "2px",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#D3D3D3",
      },
      width: isTabView ? "40px" : "45px",
      height: isTabView ? "40px" : "40px",
    },
    "& .MuiDateCalendar-root": {
      margin: "0 50px",
    },
  };

  const handleDateChange = (newDate: Date) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <Paper elevation={3} sx={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          maxDate={dayjs()}
          value={dayjs(date)}
          onChange={handleDateChange}
          sx={{ ...styles.calendar, ...dynamicStyles }}
          slots={{
            day: (props) => (
              <CustomDay {...props} selectedDays={selectedDays} />
            ),
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default MainCalendar;
