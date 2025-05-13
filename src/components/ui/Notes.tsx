import moment from "moment";
import Image from "next/image";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Avatar from "@mui/material/Avatar";
import { Typography, Box } from "@mui/material";
import { Note, NotesProps } from "@/types/interfaces";

const styles = {
  container: {
    backgroundColor: "#FFFFFF",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.6rem",
  },
  notesList: {
    overflow: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cccccc",
      borderRadius: "4px",
    },
  },
  noteCard: {
    backgroundColor: "#ffffff",
    padding: "0.75rem 1.125rem",
    cursor: "pointer",
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexStart: {
    alignItems: "center",
    marginTop: "7px",
  },
  wrapper: {
    width: "31px",
    height: "17px",
    background: "#ECF9F7",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noteText: {
    fontSize: "10px",
    fontFamily: "Poppins",
    lineHeight: "16px",
    fontWeight: 400,
    color: "#444444",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "331px",
    margin: "0.62rem 0 0",
  },
  descriptionTitle: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16.8px",
    lineHeight: "24px",
    color: "#000000",
  },
  noteTitle: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
    color: "#444444",
    textOverflow: "ellipsis",
  },
  readingTime: {
    fontSize: "10px",
    lineHeight: "16px",
    color: "#444444",
    fontFamily: "Poppins",
    fontWeight: 400,
  },
  byPlayerCoach: {
    fontSize: "10px",
    lineHeight: "16px",
    color: "#0F9BB0",
    fontFamily: "Poppins",
    fontWeight: 400,
  },
  devider: {
    margin: 0,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#9b1b1b",
    borderBottomWidth: "thin",
    marginLeft: "10px",
    marginRight: "11px",
  },
};

export default function Notes({
  setOpen,
  note,
  date,
  setNoteDetails,
  setReadJournal,
  isTabView,
}: NotesProps) {
  const handleReadNote = (noteDetails: Note) => {
    setNoteDetails(noteDetails);
    setReadJournal(true);
    setOpen(true);
  };

  const notesForDate = note[date?.toISOString().slice(0, 10)] || [];
  const notesListStyles = {
    ...styles.notesList,
    maxHeight: isTabView ? "256px" : "325px",
    marginBottom: "20px",
  };

  const renderPlayerOrGroup = (noteItem: Note) => {
    if (noteItem.Group?.name && !noteItem.Player?.first_name) {
      return (
        <Box
          sx={{
            ...styles.flexBetween,
            marginTop: "21px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={styles.wrapper}>
              <PeopleOutlineIcon
                sx={{ fontSize: "0.8rem", color: "#56E4D7" }}
              />
            </Box>
            <Typography sx={{ ...styles.readingTime, marginLeft: "5px" }}>
              {noteItem.Group.name}
            </Typography>
          </Box>
          <Typography sx={styles.byPlayerCoach}>by Player</Typography>
        </Box>
      );
    }

    if (noteItem.Player?.first_name) {
      return (
        <Box
          sx={{
            ...styles.flexBetween,
            marginTop: "21px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={styles.wrapper}>
              <Avatar
                alt="Note User"
                src="/images/noteUser.jpg"
                sx={{ width: 15, height: 15 }}
              />
            </Box>
            <Typography sx={{ ...styles.readingTime, marginLeft: "5px" }}>
              {`${noteItem.Player.first_name} ${
                noteItem.Player.last_name || ""
              }`}
            </Typography>
          </Box>
          <Typography sx={styles.byPlayerCoach}>by Coach</Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <>
      <Box sx={styles.container}>
        <Typography sx={styles.descriptionTitle}>Notes</Typography>
        <Image
          src="/images/svg/plus.svg"
          width={20}
          height={20}
          onClick={() => setOpen(true)}
          alt="Add Note"
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Box sx={notesListStyles}>
        {notesForDate.map((noteItem, index) => (
          <Box
            sx={[
              styles.noteCard,
              index === 0 ? { marginTop: "3px" } : { marginTop: "5px" },
            ]}
            key={noteItem.id}
            onClick={() => handleReadNote(noteItem)}
          >
            <Box sx={styles.flexBetween}>
              <Typography sx={styles.noteTitle}>{noteItem.title}</Typography>
              <Typography sx={styles.readingTime}>
                {moment(noteItem.reading_time).format("hh:mm:ss a")}
              </Typography>
            </Box>
            {renderPlayerOrGroup(noteItem)}
            <Typography sx={styles.noteText}>{noteItem.note}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
