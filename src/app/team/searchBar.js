import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #23AFC4;
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`,
);

export default function BasicModal(props) {
  const { setSearchValue, searchValue, loadAllpayersData } = props;

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        style={{
          width: "76%",
          height: "2.3rem",
        }}
        justifyContent="flex-end"
      >
        <Root>
          <InputWrapper>
            <i
              className="fa fa-search"
              style={{
                margin: "0.5rem 0.2rem 0.5rem 0.5rem",
                color: "#ADADAD",
              }}
            ></i>
            <input
              placeholder={"Search by name"}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </InputWrapper>
        </Root>
        <Button
          fullWidth
          size="large"
          disabled={searchValue?.length === 0}
          style={
            searchValue?.length > 0
              ? {
                  fontSize: "0.8rem",
                  lineHeight: "1rem",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontStyle: "normal",
                  width: 80,
                  height: 32,
                  marginLeft: "0.5rem",
                  backgroundColor: "#0F9BB0",
                  color: "white",
                  textTransform: "capitalize",
                }
              : {
                  fontSize: "0.8rem",
                  lineHeight: "1rem",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontStyle: "normal",
                  width: 80,
                  height: 32,
                  marginLeft: "0.5rem",
                  backgroundColor: "#77D0D1",
                  color: "white",
                  textTransform: "capitalize",
                }
          }
          onClick={() => loadAllpayersData()}
        >
          Search
        </Button>
      </Grid>
    </Box>
  );
}
