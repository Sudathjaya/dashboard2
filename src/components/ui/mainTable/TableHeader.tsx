import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { VitalsHeader } from "./VitalsHeader";
import { TableHeaderProps } from "@/types/interfaces";

const styles = {
  Checkbox: {
    display: "flex",
    alignItems: "center",
    marginLeft: "11px",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
  },
  deviceCount: {
    ml: "4px",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
  header: {
    width: "100%",
    height: "2.37rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
  },
  headingCount: {
    width: "8%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tittle1: {
    width: "18%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  tittle2: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tittle4: {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spo2: {
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
};

export const TableHeader = ({
  membersCount,
  changeOrder,
}: TableHeaderProps) => (
  <Box sx={styles.header}>
    <Box sx={styles.headingCount}>
      <Box sx={styles.Checkbox}>
        <Image
          src="/images/svg/theNumOfDevice.svg"
          alt="Devices"
          width={14}
          height={16}
        />
        <Typography variant="body2" sx={styles.deviceCount}>
          {membersCount}
        </Typography>
      </Box>
    </Box>
    <Box sx={styles.tittle1}>
      <Typography variant="h5" sx={{ fontSize: "0.78rem", marginRight: "5px" }}>
        UserName
      </Typography>
      <Image
        src="/images/svg/arrow.svg"
        alt="arrow"
        width={13}
        height={12}
        onClick={() => changeOrder("first_name")}
      />
    </Box>
    <Box sx={styles.tittle2}>
      <Typography variant="body2" sx={styles.spo2}>
        SPO<sub>2</sub>
      </Typography>
      <Image
        src="/images/svg/questionmark.svg"
        alt="questionmark"
        width={19}
        height={20}
        style={{ marginLeft: 2 }}
      />
    </Box>
    <VitalsHeader />
    <Box sx={styles.tittle4}>
      <Typography variant="h5" sx={{ fontSize: "0.78rem", marginRight: "5px" }}>
        Last Active Time
      </Typography>
      <Image
        src="/images/svg/arrow.svg"
        alt="arrow"
        width={13}
        height={12}
        onClick={() => {}}
      />
    </Box>
  </Box>
);
