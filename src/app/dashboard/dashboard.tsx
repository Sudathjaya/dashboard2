/* eslint-disable */
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TEXTS } from "../../../public/const";
import Grid from "@mui/material/Grid2";
import Notes from "@/components/ui/Notes";
import { useSession } from "next-auth/react";
import MainTable from "@/components/ui/MainTable";
import MainCalendar from "@/components/ui/MainCalendar";
import { getDashboardDetails, getJournals } from "@/services/dashboardService";
import { Theme, useMediaQuery } from "@mui/material";
import { DashboardProps } from "@/types/interfaces";
import Toolbar from "@/components/ui/ToolBar";

const styles = {
  container: {
    height: "80vh",
    padding: 2,
    marginLeft: { xs: 1, sm: 2, md: 3, lg: 5 },
    marginRight: { xs: 1, sm: 2, md: 3, lg: 5 },
  },
  mainTable: { md: 9.2, sm: 12, xs: 12 },
  secondContainer: { md: 2.8, sm: 12, xs: 12 },
  mainTable2: { md: 8.1, sm: 12, xs: 12 },
  secondContainer2: { md: 3.9, sm: 12, xs: 12 },
  calendar: { md: 12 },
  notes: { md: 12 },
};

const Dashboard = ({ userProfile }: DashboardProps) => {
  const isTabView: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("ipadPro", "lg"),
  );
  const isNormalTabView: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("sm", "ipadPro"),
  );
  const [users, setUsers] = useState<string[]>([]);
  const [members, setMembers] = useState<
    {
      user_id: string;
      first_name: string;
      last_name: string;
      id: number;
      userName: string;
    }[]
  >([]);
  const [group, setGroup] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [records, setRecords] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const { data: session, status } = useSession();
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [note, setNote] = useState<Record<string, any>>({}); // Updated type
  const [date, setDate] = useState<Date>(new Date());
  const [noteDetails, setNoteDetails] = useState<any[]>([]);
  const [readJournal, setReadJournal] = useState<boolean>(false);
  const [groupData, setGroupData] = useState<Record<string, any>[]>([]); // Updated type

  const formName = "Pick Team";

  useEffect(() => {
    getJournalData();
    // eslint-disable-next-line
  }, [group, userProfile]);

  const loadData = async (
    order: string,
    filed: string,
    page: number,
    pageSize: number,
  ) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const response = await getDashboardDetails(
          session.user.accessToken,
          page,
          order,
          filed,
          group,
          searchValue,
          pageSize,
        );

        if (response) {
          const { total_pages, total_records, data } = response.data;

          setTotalPages(total_pages);
          setRecords(total_records);

          const dmember = data.map(
            (
              member: {
                user_id: string;
                first_name: string;
                last_name: string;
              },
              index: number,
            ) => ({
              ...member,
              id: index,
              userName: `${member.first_name} ${member.last_name}`,
            }),
          );

          setMembers(dmember);

          const users = dmember.map(
            (user: { user_id: string }) => user.user_id,
          );
          setUsers(users);
          setSelectedDays([]);
          setSearchValue("");
          setGroup("");
        }
      }
    } catch (error) {
      /* eslint-disable no-console */
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching dashboard details:", error);
      }
    }
  };

  const getJournalData = async () => {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const groupsList = userProfile?.groups || [];

    const all = {
      id: "",
      name: "All",
      category: "All",
      category_id: "N/A",
      coach_id: "N/A",
      coach_name: "N/A",
    };
    const updatedGroupsList = [all, ...groupsList];
    setGroupData(updatedGroupsList);
    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      const res = await getJournals(
        session.user.accessToken,
        date.getFullYear(),
        month,
        { group_id: group },
      );
      setNote(res.data.data);
      let getDays = Array.isArray(res.data.data)
        ? res.data.data.map((element: { prop: any }) => element.prop)
        : [];

      setSelectedDays(getDays);
    }
  };

  const searchPlayers = async (
    order: string,
    filed: string,
    searchValue: string,
  ) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const response = await getDashboardDetails(
          session.user.accessToken,
          pageNumber,
          order,
          filed,
          group,
          searchValue,
          pageSize,
        );

        if (response) {
          const { total_pages, total_records, data } = response.data;

          setTotalPages(total_pages);
          setRecords(total_records);

          const dmember = data.map(
            (
              member: {
                user_id: string;
                first_name: string;
                last_name: string;
              },
              index: number,
            ) => ({
              ...member,
              id: index,
              userName: `${member.first_name} ${member.last_name}`,
            }),
          );

          setMembers(dmember);

          const users = dmember.map(
            (user: { user_id: string }) => user.user_id,
          );
          setUsers(users);
        }
      }
    } catch (error) {
      /* eslint-disable no-console */
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching dashboard details:", error);
      }
    }
  };

  return (
    <>
      <Toolbar
        groupData={groupData}
        setGroup={setGroup}
        group={group}
        formName={formName}
        isTabView={isTabView}
        isNormalTabView={isNormalTabView}
        searchPlayers={searchPlayers}
        setSearchValue={setSearchValue}
      />
      <Grid container spacing={1} sx={styles.container}>
        <Grid size={isTabView ? styles.mainTable2 : styles.mainTable}>
          <MainTable
            members={members}
            loadData={loadData}
            users={users}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            totalPages={totalPages}
            totalRecords={records}
            setPageSize={setPageSize}
            pageSize={pageSize}
            group={group}
            getJournalData={getJournalData}
          />
        </Grid>
        <Grid
          size={isTabView ? styles.secondContainer2 : styles.secondContainer}
          container
          direction="column"
          spacing={1}
        >
          <Grid
            size={styles.calendar}
            sx={{
              paddingTop: "5px",
            }}
          >
            <MainCalendar
              selectedDays={selectedDays}
              date={date}
              setDate={setDate}
              isTabView={isTabView}
            />
          </Grid>

          <Grid size={styles.notes} spacing={0}>
            <Notes
              setOpen={setOpen}
              note={note}
              date={date}
              setNoteDetails={setNoteDetails}
              setReadJournal={setReadJournal}
              getJournalData={getJournalData}
              isTabView={isTabView}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
