import Grid from "@mui/material/Grid2";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import SearchInterface from "./SearchInterface";
import ActionButtons from "./ActionButtons";
import { ToolBarProps } from "@/types/interfaces";

const customTheme = createTheme({
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
});

const styles = {
  container: {
    padding: 2,
    marginX: { xs: 1, sm: 2, md: 3, lg: 5 },
  },

  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
  },
  gridFullWidth: {
    width: "100%",
  },
  grid1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
  },
  grid2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 2,
  },
  main: { md: 9.2, sm: 12, xs: 12 },
  main2: { md: 12, sm: 12, xs: 12 },
};

export default function Toolbar({
  groupData,
  setGroup,
  group,
  formName,
  isTabView,
  isNormalTabView,
  searchPlayers,
  setSearchValue,
}: ToolBarProps) {
  /* eslint-disable-next-line */
  const onSearch = (query: string, team: string) => {
    setSearchValue(query);
    searchPlayers("asc", "first_name", query);
  };

  const onDownload = () => {};

  const onCompare = () => {};

  return (
    <>
      {!isNormalTabView ? (
        <Grid
          container
          spacing={1}
          sx={{
            ...styles.container,
            height: isTabView ? "4vh" : "7vh",
          }}
        >
          <Grid size={isTabView ? styles.main2 : styles.main}>
            <ThemeProvider theme={customTheme}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Grid sx={styles.grid1}>
                  <SearchInterface
                    onSearch={onSearch}
                    groupData={groupData}
                    setGroup={setGroup}
                    group={group}
                    formName={formName}
                  />
                </Grid>
                <Grid
                  sx={{
                    ...styles.grid2,
                    marginLeft: isTabView ? "52px" : "324px",
                  }}
                >
                  <ActionButtons
                    onDownload={onDownload}
                    onCompare={onCompare}
                  />
                </Grid>
              </Box>
            </ThemeProvider>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            ...styles.container,
            flexDirection: isNormalTabView ? "column" : "row",
            alignItems: "flex-start",
          }}
        >
          {/* Search Interface */}
          <Grid sx={styles.gridFullWidth}>
            <ThemeProvider theme={customTheme}>
              <SearchInterface
                onSearch={onSearch}
                groupData={groupData}
                setGroup={setGroup}
                group={group}
                formName={formName}
              />
            </ThemeProvider>
          </Grid>

          {/* Action Buttons */}
          <Grid
            sx={{
              ...styles.gridItem,
              marginTop: isNormalTabView ? 2 : 0,
              width: isNormalTabView ? "100%" : "auto",
            }}
          >
            <ThemeProvider theme={customTheme}>
              <ActionButtons onDownload={onDownload} onCompare={onCompare} />
            </ThemeProvider>
          </Grid>
        </Grid>
      )}
    </>
  );
}
