/* eslint-disable */
import { ChangeEvent, useState } from "react";
import { SearchInterfaceProps } from "@/types/interfaces";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const styles = {
  autoSelect: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "14px",
    color: "#23AFC4",
  },
  select: {
    color: "#23AFC4",
    backgroundColor: "white",
    height: 35,
    ".MuiOutlinedInput-notchedOutline": { borderColor: "#23AFC4" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#23AFC4",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#23AFC4" },
    ".MuiSvgIcon-root": { fill: "#23AFC4" },
  },
  menuItemBox: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 120,
    maxHeight: 20,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "343px",
    border: "1px solid #B0D9E1",
    borderRadius: "3px 0 0 3px",
    height: "33px",
  },
  searchInput: {
    fontSize: "11.04px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#ADADAD",
    "& input::placeholder": {
      color: "#ADADAD",
      opacity: 1,
    },
  },
  searchButton: {
    textTransform: "none",
    backgroundColor: "#0F9BB0",
    color: "#FFFFFF",
    borderRadius: "3px 3px 0 0",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
    padding: "8px 24px",
    height: "33px",
    minWidth: "100px",
    "&:hover": { backgroundColor: "#A0D1D5" },
    "&:active": { backgroundColor: "#0F9BB0" },
  },
};

export default function SearchInterface({
  onSearch,
  groupData,
  setGroup,
  group,
  formName,
}: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery, group); // Send search query and group to the parent handler
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {/* Group Selector */}
      <Select
        sx={styles.select}
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        displayEmpty
        renderValue={() => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 105,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Box component="span" sx={styles.autoSelect}>
              {group
                ? groupData.find((item) => item.id === group)?.name
                : formName}
            </Box>
          </Box>
        )}
      >
        {groupData.map((group) => (
          <MenuItem key={group.id} value={group.id}>
            <Box sx={styles.menuItemBox}>
              <ListItemIcon>
                <PeopleAltIcon sx={{ color: "#23AFC4", maxHeight: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h2"
                    sx={{ fontSize: "14px", textAlign: "start" }}
                  >
                    {group.name}
                  </Typography>
                }
              />
            </Box>
          </MenuItem>
        ))}
      </Select>

      {/* Search Input and Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={styles.searchBox}>
          <Search
            sx={{ width: 19, height: 19, color: "#B0D9E1", marginLeft: 1.5 }}
          />
          <TextField
            variant="standard"
            placeholder="Search by name and separate by space"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              disableUnderline: true,
              sx: styles.searchInput,
            }}
            sx={{
              marginLeft: 1,
              flexGrow: 1,
              "& .MuiInputBase-root": { height: "100%" },
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleSearchClick}
          disabled={!searchQuery.trim()}
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
          Search
        </Button>
      </Box>
    </Box>
  );
}
