import {
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Select,
  Box,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const styles = {
  select: {
    color: "#23AFC4",
    backgroundColor: "white",
    height: 35,
    ".MuiOutlinedInput-notchedOutline": { borderColor: "#23AFC4" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#23AFC4",
      },
    ".MuiSvgIcon-root": { fill: "#23AFC4" },
  },
  autoSelect: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "14px",
    color: "#23AFC4",
  },
  menuItemBox: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 120,
  },
};

interface Group {
  id: string | number;
  name: string;
}

interface FormControlComponentProps {
  groupData: Group[];
  setGroup: React.Dispatch<React.SetStateAction<any>>;
  group: string | number;
  formName: string;
}

const FormControlComponent: React.FC<FormControlComponentProps> = ({
  groupData,
  setGroup,
  group,
  formName,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: 105,
            }}
          >
            <Typography sx={styles.autoSelect} component="span">
              {group
                ? groupData.find((item) => item.id === group)?.name
                : formName}
            </Typography>
          </Box>
        )}
      >
        {groupData.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            <Box sx={styles.menuItemBox}>
              <ListItemIcon>
                <PeopleAltIcon sx={{ color: "#23AFC4", maxHeight: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    {name}
                  </Typography>
                }
              />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default FormControlComponent;
