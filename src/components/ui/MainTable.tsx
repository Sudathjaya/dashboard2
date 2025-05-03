/* eslint-disable */
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import moment from "moment";
import Jsonpack from "jsonpack";
import { Box, Checkbox, Stack, Typography, Avatar } from "@mui/material";
import { TEXTS } from "../../../public/const";
import Chart from "./mainTable/Chart";
import PaginationComponent from "./mainTable/PaginationComponent";
import { getTeamData } from "@/services/dashboardService";
import { getLastActiveTime, getSpo2Value, loadColorCode } from "@/lib/util";
import { AccessUser, MainTableProps } from "@/types/interfaces";
import { TableHeader } from "./mainTable/TableHeader";

const styles = {
  Checkbox: {
    display: "flex",
    alignItems: "center",
    marginLeft: "11px",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "15.79px",
  },
  tdText: {
    fontStyle: "normal",
    display: "flex",
    alignItems: "left",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "0.7rem",
    fontWeight: 400,
    textAlign: "left",
  },

  tdTextMark: {
    color: "#23AFC4",
    textDecoration: "underline",
    fontStyle: "normal",
    display: "flex",
    alignItems: "left",
    fontFamily: "Poppins",
    fontSize: "0.7rem",
    fontWeight: 400,
    textAlign: "left",
  },
  cell: {
    display: "flex",
    alignItems: "left",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "left",
  },
  spo2: {
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
  vitals: {
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
  },
  tdNumber: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "1.18rem",
    lineHeight: "1.75rem",
    color: "#444444",
    textAlign: "center",
    marginRight: "5px",
  },

  chartText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "0.625rem",
    lineHeight: "1rem",
    color: "#ADADAD",
    padding: 0,
    margin: 0,
  },
  height: "80vh",
  width: "100%",
  border: 0,
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f5f5f5",
    borderBottom: "4px solid #edf4f6",
    color: "#444444",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },

  tableHead: {
    display: "flex",
    justifyContent: "center",
    margin: "5px 0px",
  },

  tBody: {
    width: "100%",
    height: "5rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  tBodyMark: {
    width: "100%",
    height: "5rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ECF9F7",
  },
  tittle7: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title4: {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titles: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  title6: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  item1: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
  },
  item2: {
    width: "20%",
    display: "flex",
    justifyContent: "center",
  },
  item3: {
    width: "50%",
    display: "flex",
    justifyContent: "flex-start",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
};

export default function MainTable({
  loadData,
  members,
  totalPages,
  users,
  pageNumber,
  setPageNumber,
  setPageSize,
  pageSize,
  group,
  getJournalData,
}: MainTableProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fromDate, setFromDate] = useState("");
  const [filedOrder, setFiledOrder] = useState("asc");
  const [vitals, setVitals] = useState<Record<string, any[]>>({});
  const [accessUser, setAccessUser] = useState<AccessUser | null>(null);
  const dateNow = new Date();

  useEffect(() => {
    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      loadData("asc", "first_name", pageNumber, pageSize);
    }
  }, [status, session?.user?.accessToken, pageNumber, pageSize]);

  useEffect(() => {
    getJournalData();
    // eslint-disable-next-line
  }, [group]);

  /**
   * This will optimize in next releases
   * Do not remove
   * **/
  useEffect(() => {
    const interval = setInterval(getData, 5000);
    return () => clearInterval(interval);
  }, [users]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    setAccessUser(event.target.checked ? row : null);
  };

  const handlePageChange = (page: number, page_size: number) => {
    if (pageNumber !== page || page_size !== pageSize) {
      setPageNumber(page);
      loadData(filedOrder, "first_name", page, page_size);
    }
  };

  const viewUser = (id: string) => {
    router.push(`${id}`);
  };

  const changeOrder = (filed: string) => {
    const newOrder = filedOrder === "asc" ? "desc" : "asc";
    loadData(newOrder, filed, pageNumber, pageSize);
    setFiledOrder(newOrder);
  };

  const getData = async () => {
    try {
      if (
        users.length === 0 ||
        status !== TEXTS.AUTHENTICATED ||
        !session?.user?.accessToken
      ) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: Record<string, any> = {
        only_updates: fromDate !== "",
        user_ids: users,
        ...(fromDate && { from_time: fromDate }),
      };
      const response = await getTeamData(session.user.accessToken, payload);

      if (!response?.data?.data) {
        return;
      }

      const json = Jsonpack.unpack(response.data.data) as Record<string, any[]>;
      setVitals(json);

      const latestDate = Object.values(json)
        .flatMap((items) => items.map((item) => new Date(item.reading_time)))
        .reduce((max, date) => (date > max ? date : max), new Date(0));

      setFromDate(latestDate.toISOString());
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching dashboard details:", error);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSPO2Icon = (vitals: any, item: any) => {
    if (Object.keys(vitals).length === 0) {
      return "";
    }
    if (!item?.user_id) {
      return "";
    }

    if (vitals[String(item?.user_id)]) {
      const time =
        vitals[String(item?.user_id)][vitals[String(item?.user_id)]?.length - 1]
          ?.spo2;
      const signalQuality =
        vitals[String(item?.user_id)][vitals[String(item?.user_id)]?.length - 1]
          ?.signal_quality;

      if (signalQuality === "Good") {
        if (time === undefined) {
          return "";
        } else {
          if (time <= 100 && time >= 95) {
            return (
              <Image
                src="/images/svg/vector.svg"
                alt="Success"
                width={0.8}
                height={0.8}
              />
            );
          }
          if (time <= 94 && time >= 90) {
            return (
              <Image
                src="/images/svg/warn.svg"
                alt="Success"
                width={0.8}
                height={0.8}
              />
            );
          }
          if (time < 90) {
            return (
              <Image
                src="/images/svg/error.svg"
                alt="Success"
                width={0.8}
                height={0.8}
              />
            );
          } else {
            return "";
          }
        }
      } else {
        if (time === undefined) {
          return "";
        } else {
          if (time <= 100 && time >= 95) {
            return (
              <Image
                src="/images/svg/vectorGray.svg"
                alt="Success"
                width={12.8}
                height={12.8}
              />
            );
          }
          if (time <= 94 && time >= 90) {
            return (
              <Image
                src="/images/svg/warnGray.svg"
                alt="Success"
                width={12.8}
                height={12.8}
              />
            );
          }
          if (time < 90) {
            return (
              <Image
                src="/images/svg/errorGray.svg"
                alt="Success"
                width={12.8}
                height={12.8}
              />
            );
          } else {
            return "";
          }
        }
      }
    } else {
      return "";
    }
  };

  return (
    <Box>
      <Box sx={styles.tableHead}>
        <TableHeader membersCount={members.length} changeOrder={changeOrder} />
      </Box>
      {members.map((item) => (
        <Box sx={styles.container} key={item.member_id}>
          <Box
            sx={
              accessUser?.member_id === item.member_id
                ? styles.tBodyMark
                : styles.tBody
            }
          >
            <Box sx={styles.title6}>
              <Box sx={styles.item1}>
                <Checkbox
                  checked={accessUser?.id === item.id}
                  onChange={(e) => handleCheckboxChange(e, item)}
                  sx={{
                    color: "#23AFC4",
                    borderRadius: "1.58px",
                    "&.Mui-checked": {
                      color: "#23AFC4",
                      borderRadius: "1.58px",
                    },
                  }}
                />
              </Box>
              <Box sx={styles.item2} onClick={() => viewUser(item)}>
                <Avatar
                  alt="user"
                  src={item.avatar_url}
                  sx={{ width: 30, height: 30 }}
                />
              </Box>
              <Box sx={styles.item3} onClick={() => viewUser(item)}>
                <Typography
                  sx={
                    accessUser?.member_id === item.member_id
                      ? styles.tdTextMark
                      : styles.tdText
                  }
                >
                  {item?.first_name}&nbsp; {item?.last_name}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.tittle7}>
              <Typography
                component="span"
                sx={{
                  ...styles.tdNumber,
                  ...loadColorCode(getSpo2Value(vitals, item)),
                }}
              >
                {getSpo2Value(vitals, item).value}
              </Typography>
              {getSPO2Icon(vitals, item)}
            </Box>
            <Box sx={styles.titles}>
              <Box sx={{ position: "relative", top: "18px" }}>
                <Chart
                  vitals={
                    vitals && users?.length > 0 && item?.user_id
                      ? vitals[item.user_id] || []
                      : []
                  }
                  height={50}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                  top: "5px",
                }}
              >
                {[-5, -2.5, 0].map((minutes) => (
                  <Typography key={minutes} sx={styles.chartText}>
                    {moment(dateNow)
                      .subtract(minutes, "minutes")
                      .format("hh:mm:ss A")}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={styles.title4}>
              <Typography
                variant="h4"
                sx={{ fontSize: "0.7rem", lineHeight: "1rem" }}
              >
                {getLastActiveTime(vitals, item)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box sx={styles.pagination}>
        <Stack spacing={2}>
          <PaginationComponent
            page={pageNumber}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            setPageSize={setPageSize}
            pageSize={pageSize}
          />
        </Stack>
      </Box>
    </Box>
  );
}
