import { useState, useEffect, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import { Box, Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Grid2";
import RenderCheckBox from "./renderCheckboxTeam";
import FormControlComponent from "./formControl";
import ButtonComponent from "./buttonComponent";
import Snackbar from "@mui/material/Snackbar";
import SearchBar from "./searchBar";
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import type { Group } from "@/types/interfaces";
import { TEXTS } from "@/public/const";
import { getProfile } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  addPlayers,
  createGroup,
  deleteGroupById,
  deletePlayer,
  getCategory,
  getMembers,
  getTeamPlayers,
  updateGroup,
} from "@/services/teamService";
import { format } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";

interface InitialValues {
  coachName: string;
  teamName: string;
  category_id: string | null;
  players: string[];
  name: string;
}

interface AlertState {
  showAlert: boolean;
  severity: "success" | "error";
  message: string;
}

const style = {
  tableHead: {
    display: "flex",
    justifyContent: "center",
    margin: "5px 0px",
  },
  header1: {
    width: "76.28%",
    height: "2.37rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#77D0D1",
  },
  topbar1: {
    width: "33.33%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  topbar2: {
    width: "33.33%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  topbar3: {
    width: "33.33%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  tBody: {
    width: "76.28%",
    height: "4.43rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  tittle6: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item1: {
    width: "48%",
    display: "flex",
    justifyContent: "center",
  },
  tBody1: {
    width: "76.28%",
    height: "8rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: "2rem",
  },
  topbarDefault: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "76.28%",
    height: "2.37rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  headingCount: {
    width: "13%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tittle1: {
    width: "32.5%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tittle2: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tittle3: {
    width: "19%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tittle4: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tittle7: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item2: {
    width: "20%",
    display: "flex",
    justifyContent: "center",
  },
  item3: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  tBodyDefault: {
    width: "76.28%",
    height: "30rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  formContainer: { width: "80%", textAlign: "center", marginBottom: "4rem" },
  errorMessage: {
    fontFamily: "Poppins",
    fontWeight: 300,
    fontSize: "15px",
    lineHeight: "30px",
    color: "#F75F56",
  },
  textField: { marginBottom: "1.8rem" },
  buttonBox: { display: "flex", justifyContent: "flex-end", width: "33.5%" },
  cusTitle: {
    fontSize: {
      xs: "1.7rem",
      sm: "1.9rem",
      md: "2rem",
      lg: "2.5rem",
    },
  },
  editBox: {
    width: "76.28%",
    height: "8rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: "2rem",
  },
};

interface FormValues {
  teamName: string;
  coachName: string;
  name: string;
  players: any;
}

const Team: React.FC = () => {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState<any[]>([]);
  const [membersChecked, setMembersChecked] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string[]>([]);
  const [groupData, setGroupData] = useState<any[]>([]);
  const [groupCategory, setGroupCategory] = useState<any[]>([]);
  const [group, setGroup] = useState<string>("");
  const [checkedSelected, setCheckedSelected] = useState<string[]>([]);
  const formName = "Select Team";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [deleteTeam, setDeleteTeam] = useState(false);
  const [coachName, setCoachName] = useState("");
  const [initialValues, setInitialValues] = useState<InitialValues>({
    coachName: coachName,
    teamName: "",
    category_id: null,
    players: [],
    name: "",
  });
  const [options, setOptions] = useState<string[]>([]);
  const [alert, setAlert] = useState<AlertState>({
    showAlert: false,
    severity: "success",
    message: "",
  });

  const [open, setOpen] = useState<boolean>(false);

  const teamSchema = z.object({
    teamName: z
      .string()
      .min(2, { message: "Please enter team name" })
      .default(""),
    coachName: z
      .string()
      .min(2, { message: "Please enter coach name" })
      .default(""),
    name: z
      .string()
      .min(1, { message: "Category name is required." })
      .refine(
        (value) => {
          if (initialValues?.category_id) {
            return true;
          } else {
            return !groupCategory.some(
              (item) => item?.name?.toUpperCase() === value?.toUpperCase(),
            );
          }
        },
        { message: "Category already exists" },
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(teamSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    // Reset form with new values when initialValues change
    if (initialValues) {
      control._reset(initialValues);
    }
  }, [initialValues, control]);

  const customTheme = useMemo(
    () =>
      createTheme({
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#23AFC4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#23AFC4",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              icon: {
                color: "#23AFC4",
              },
            },
          },
        },
      }),
    [],
  );
  useEffect(() => {
    loadDataGroupData();
    loadCategory();
    /*eslint-disable-next-line*/
  }, []);

  const showAlert = (
    severity: "success" | "error",
    message: string,
    duration = 5000,
  ) => {
    setAlert({
      showAlert: true,
      severity,
      message,
    });
    setOpen(true);

    if (duration > 0) {
      setTimeout(() => {
        setAlert({
          showAlert: false,
          severity,
          message,
        });
      }, duration);
    }
  };

  useEffect(() => {
    if (groupData) {
      if (groupData.find((item) => item?.id === group)?.name === undefined) {
        setGroup("");
      }
    }
    // eslint-disable-next-line
  }, [groupData]);

  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      coachName,
      players: [...userValue],
    }));
  }, [coachName, userValue]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  useEffect(() => {
    setEdit(false);
    setUserValue([]);
    if (group === "default") {
      loadAllpayersData();
      setInitialValues({
        ...initialValues,
        teamName: "",
        name: "",
        category_id: "",
        players: [],
      });
    } else if (group !== "") {
      loadData();
      const selectedTeam = groupData.find((item) => item?.id === group);
      if (selectedTeam) {
        setInitialValues({
          coachName: selectedTeam?.coach_name || "",
          teamName: selectedTeam?.name || "",
          name: selectedTeam?.category || "",
          category_id: selectedTeam?.category_id || null,
          players: [...userValue],
        });
      }
    }
    // eslint-disable-next-line
  }, [group]);

  useEffect(() => {
    if (checkedSelected?.length > 0) {
      if (group !== "default") {
        const obj = { group_id: group, user_id: checkedSelected[0] };
        const checktheCurrentPlayer = membersChecked.includes(
          checkedSelected[0],
        );
        if (checktheCurrentPlayer) {
          if (initialValues?.players?.length === 1) {
            setUserValue([...checkedSelected]);
            showAlert("error", "The team should have a minimum of one player");
          } else {
            removePlayer(obj);
          }
        } else {
          addPlayer(obj);
        }
      }
    }
    // eslint-disable-next-line
  }, [checkedSelected]);

  useEffect(() => {
    if (edit) {
      if (group !== "default") {
        const selectedTeam = groupData.find((item) => item.id === group);
        setInitialValues({
          coachName: selectedTeam?.coach_name || "",
          teamName: selectedTeam?.name || "",
          name: selectedTeam?.category || "",
          category_id: selectedTeam?.category_id || null,
          players: [...userValue],
        });
        loadAllpayersData();
        setUserValue([...membersChecked]);
      } else {
        setInitialValues({
          ...initialValues,
          teamName: "",
          name: "",
          category_id: null,
          players: [],
        });
        setUserValue([]);
      }
    } else {
      setUserValue([]);
      loadData();
    }
    // eslint-disable-next-line
  }, [edit]);

  const addPlayer = async (parms: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await addPlayers(session?.user?.accessToken, parms);
        setMembersChecked([...membersChecked, parms.user_id]);
        setUserValue([...membersChecked, parms.user_id]);
        showAlert("success", "Player added to the group");
      }
    } catch {
      showAlert("error", "Error adding player");
    }
  };

  const removePlayer = async (parms: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await deletePlayer(session?.user?.accessToken, parms);
        const removeMemberCheckedArray = membersChecked.filter(
          (item) => item !== parms.user_id,
        );
        setMembersChecked(removeMemberCheckedArray);
        setUserValue(removeMemberCheckedArray);
        showAlert("success", "Player removed");
      }
    } catch {
      showAlert("error", "Error removing player");
    }
  };

  const loadData = async () => {
    try {
      if (group !== "default" && group !== "" && session?.user?.accessToken) {
        try {
          const response = await getMembers(
            session.user.accessToken,
            pageNumber,
            10,
            group,
          );
          if (response) {
            setCount(response.total_pages ?? 0);
            setMembers(response.data ?? []);
            const checkMembers: string[] =
              response.data?.map((item: { user_id: string }) => item.user_id) ??
              [];
            setMembersChecked([...checkMembers]);
          }
        } catch (error) {
          /*eslint-disable-next-line*/
          console.error("Error fetching members:", error);
        }
      } else {
        setMembers([]);
      }
    } catch {
      showAlert(
        "error",
        "You're not in a Team yet. Please ask your team admin to invite you in.",
      );
    }
  };

  const updateData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await updateGroup(session?.user?.accessToken, group, {
          name: initialValues.teamName,
          category_id: initialValues.category_id
            ? initialValues.category_id
            : null,
          category: initialValues.name,
        });
      }
    } catch {
      showAlert("error", "Something was wrong!");
    }
  };

  const deleteGroup = async (group: string) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        await deleteGroupById(session?.user?.accessToken, group);
      }
    } catch {
      showAlert("error", "Something was wrong!");
    }
  };

  const loadCategory = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getCategory(session?.user?.accessToken);
        if (data?.data) {
          const allCategories = data.data;
          allCategories?.sort(
            (
              a: { name: { toLowerCase: () => number } },
              b: { name: { toLowerCase: () => number } },
            ) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            },
          );
          setGroupCategory([...allCategories]);
          const option = data.data.map((op: { name: string }) => op.name);
          const uniqueOptions: string[] = Array.from(new Set(option));
          setOptions(uniqueOptions);
        }
      }
    } catch {
      showAlert("error", "Something was wrong!");
    }
  };

  const submit = async (e: any) => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const result = await createGroup(
          TEXTS.AUTHENTICATED && session?.user?.accessToken,
          {
            name: e.teamName,
            category_id: initialValues.category_id
              ? initialValues.category_id
              : null,
            category: initialValues.name,
            players: userValue, //e.players,
          },
        );
        await loadDataGroupData();
        setInitialValues({
          coachName: coachName,
          teamName: "",
          name: "",
          category_id: "",
          players: [],
        });

        setGroup(result?.data?.data?.group_id);
        showAlert("success", "Team created Successfully!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        if (axiosError.response?.data?.message) {
          showAlert("error", axiosError.response.data.message);
        } else {
          showAlert("error", "Something went wrong!");
        }
      } else {
        showAlert("error", "An unknown error occurred!");
      }
    }
  };

  useEffect(() => {
    if (pageNumber) {
      loadData();
      if (group !== "") {
        loadAllpayersData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (searchValue?.length === 0) {
      loadAllpayersData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const loadAllpayersData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data } = await getTeamPlayers(
          session?.user?.accessToken,
          pageNumber,
          10,
          "asc",
          "first_name",
          searchValue,
        );

        if (group !== "") {
          setCount(data.total_pages);
          setMembers(data.data);
          if (group === "default") {
            setEdit(true);
          }
        }
      }
    } catch {
      showAlert(
        "error",
        "You're not in a Team yet. Please ask your team admin to invite you in.",
      );
    }
  };

  const handleCategoryChange = (event: any, value: any) => {
    if (!value) return;

    const categoryName = typeof value === "string" ? value : value.name;
    const categoryId =
      groupCategory.find((item) => item.name === categoryName)?.id || null;

    setInitialValues({
      ...initialValues,
      name: categoryName,
      category_id: categoryId,
    });
  };

  const handleTeamNameChange = (event: any) => {
    setInitialValues({
      ...initialValues,
      teamName: event.target.value,
    });
  };

  const loadDataGroupData = async () => {
    try {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        const { data, error } = await getProfile(session.user.accessToken);

        if (error) {
          /* eslint-disable no-console */
          console.error("Error fetching user profile:", error);
          return;
        }

        if (data?.data) {
          setCoachName(data?.data?.first_name ?? "");
          const groups: Group[] = data.data.groups ?? [];

          // Sort the groups by name
          const sortedGroups: Group[] = [...groups].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
          );

          // Add the default group
          const defaultGroup: Group = { id: "default", name: "Add Team +" };
          sortedGroups.push(defaultGroup);

          // Update state
          setGroupData(sortedGroups);
          setMembers([]);
        }
      }
    } catch (error) {
      console.error("Error loading group data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ marginTop: "2rem" }}>
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px",
              marginLeft: "221px",
              marginRight: "221px",
              height: "38px",
            }}
          >
            <ThemeProvider theme={customTheme}>
              <FormControlComponent
                groupData={groupData}
                setGroup={setGroup}
                group={group}
                formName={formName}
              />
            </ThemeProvider>
            <Box sx={{ display: "flex", gap: 1 }}>
              <ButtonComponent
                isValid={isValid}
                edit={edit}
                setEdit={setEdit}
                group={group}
                setAlert={setAlert}
                loadDataGroupData={loadDataGroupData}
                userValue={userValue}
                initialValues={initialValues}
                setOpenMessage={setOpen}
                setDeleteTeam={setDeleteTeam}
                updateData={updateData}
                deleteGroup={deleteGroup}
              />
            </Box>
          </Box>

          <Box sx={style.tableHead}>
            <Box sx={style.header1}>
              <Box sx={style.topbar1}>
                <Typography
                  variant="h3"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  Team Name
                </Typography>
              </Box>
              <Box sx={style.topbar2}>
                <Typography
                  variant="h3"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  Coach
                </Typography>
              </Box>
              <Box sx={style.topbar3}>
                <Typography
                  variant="h3"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  Category
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={style.container}>
            {group === "" ? (
              deleteTeam ? (
                <Box sx={style.tBody1}>
                  <Box sx={style.topbarDefault}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "0.8rem",
                        lineHeight: "1rem",
                        textAlign: "center",
                      }}
                    >
                      Team Deleted! Click on “Select Team” to display
                      team/create a new team.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={style.tBody1}>
                  <Box sx={style.topbarDefault}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "0.8rem",
                        lineHeight: "1rem",
                        textAlign: "center",
                      }}
                    >
                      Click on “Select Team” to display team/create a new team.
                    </Typography>
                  </Box>
                </Box>
              )
            ) : group === "default" || edit ? (
              <Box sx={style.editBox}>
                <Grid
                  container
                  spacing={20}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    padding: 2,
                    width: "100%",
                    marginLeft: "40px",
                    marginRight: "40px",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    size={{ md: 4, sm: 12, xs: 12 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Controller
                      name="teamName"
                      control={control}
                      defaultValue={initialValues.teamName}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Enter the team name"
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          error={!!errors.teamName}
                          sx={{ minWidth: "200px", flexGrow: 1 }}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTeamNameChange(e);
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    size={{ md: 4, sm: 12, xs: 12 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Controller
                      name="coachName"
                      control={control}
                      defaultValue={initialValues.coachName}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Enter the coach name"
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          error={!!errors.coachName}
                          sx={{ minWidth: "200px", flexGrow: 1 }}
                          value={field.value}
                          disabled
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    size={{ md: 4, sm: 12, xs: 12 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={initialValues.name}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          options={options}
                          value={field.value}
                          sx={{ width: 300 }}
                          onChange={(event, newValue) => {
                            field.onChange(newValue);
                            handleCategoryChange(event, newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose category"
                              error={!!errors.name}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={style.tBody1}>
                <Box sx={style.topbar1}>
                  <Typography
                    variant="h2"
                    style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
                  >
                    {initialValues?.teamName}
                  </Typography>
                </Box>
                <Box sx={style.topbar2}>
                  <Typography
                    variant="h2"
                    style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
                  >
                    {initialValues?.coachName}
                  </Typography>
                </Box>
                <Box sx={style.topbar3}>
                  <Typography
                    variant="h2"
                    style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
                  >
                    {initialValues?.name}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          {edit && (
            <SearchBar
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              loadAllpayersData={loadAllpayersData}
            />
          )}

          <Box sx={style.tableHead}>
            <Box sx={style.header}>
              <Box sx={style.headingCount} style={{ cursor: "pointer" }}>
                <Image
                  src="/images/svg/theNumOfDevice.svg"
                  alt="Oxy1"
                  width="14"
                  height="16"
                />
                <Typography
                  variant="h5"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  {members?.length}
                </Typography>
              </Box>
              <Box sx={style.tittle1} style={{ cursor: "pointer" }}>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: "1rem",
                    marginLeft: "0.7rem",
                  }}
                >
                  UserName
                </Typography>
                <Image
                  src="/images/svg/arrow.svg"
                  alt="Oxy1"
                  width="13"
                  height="12"
                  style={{ marginLeft: "0.5rem" }}
                />
              </Box>
              <Box sx={style.tittle2}>
                <Typography
                  variant="h5"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  Email
                </Typography>
              </Box>
              <Box sx={style.tittle3}>
                <Typography
                  variant="h5"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  Date Of Birth
                </Typography>
              </Box>
              <Box sx={style.tittle4}>
                <Typography
                  variant="h5"
                  style={{ fontSize: "0.78rem", lineHeight: "1rem" }}
                >
                  Gender
                </Typography>
              </Box>
            </Box>
          </Box>
          {members.length > 0 ? (
            members.map((item, index) => (
              <Box
                sx={style.container}
                style={{ cursor: "pointer" }}
                key={index}
              >
                <Box sx={style.tBody}>
                  <Box sx={style.tittle6}>
                    <Box sx={style.item1}>
                      {edit ? (
                        <RenderCheckBox
                          members={userValue}
                          item={item}
                          setUserValue={setUserValue}
                          setCheckedSelected={setCheckedSelected}
                        />
                      ) : null}
                    </Box>
                    <Box sx={style.item2}>
                      {" "}
                      <Avatar
                        alt="Remy Sharp"
                        src={item?.avatar_url}
                        sx={{ width: 30, height: 30 }}
                      />
                    </Box>
                    <Box sx={style.item3}>
                      {" "}
                      <Typography
                        variant="h4"
                        style={{
                          fontSize: "0.69rem",
                          lineHeight: "1rem",
                          textDecoration: "underline",
                          textTransform: "capitalize",
                        }}
                      >
                        {item?.first_name}&nbsp; {item?.last_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={style.tittle7}>
                    <Typography
                      variant="h4"
                      style={{ fontSize: "0.69rem", lineHeight: "1rem" }}
                    >
                      {" "}
                      {item?.email}
                    </Typography>
                  </Box>
                  <Box sx={style.tittle3}>
                    <Typography
                      variant="h4"
                      style={{ fontSize: "0.69rem", lineHeight: "1rem" }}
                    >
                      {item?.dob
                        ? format(new Date(item.dob), "MM/dd/yyyy")
                        : "N/A"}
                    </Typography>
                  </Box>
                  <Box sx={style.tittle3}>
                    <Typography
                      variant="h4"
                      style={{
                        fontSize: "0.69rem",
                        lineHeight: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {item?.gender ? item.gender.charAt(0).toUpperCase() : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={style.container}>
              <Box sx={style.tBodyDefault}>
                {group !== "" ? (
                  <Image
                    src="/images/svg/crossMark.svg"
                    alt="addNewPlayer"
                    width="157"
                    height="157"
                    style={{ cursor: "pointer" }}
                    onClick={() => loadAllpayersData()}
                  />
                ) : null}
              </Box>
            </Box>
          )}
          <Box sx={style.pagination}>
            <Stack spacing={2}>
              <Pagination
                count={count}
                page={pageNumber}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </Stack>
          </Box>
          {alert.showAlert ? (
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
            >
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
            </Snackbar>
          ) : (
            <p style={{ height: "1.3rem" }}></p>
          )}
        </>
      </Box>
    </form>
  );
};

export default Team;
