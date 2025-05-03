import React, {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  ChangeEvent,
} from "react";
import {
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { STRINGS } from "@/public/const";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number, pageSize: number) => void;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}

const customTheme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#23AFC4",
            borderColor: "#23AFC4",
          },
        },
      },
    },
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

const PaginationComponent: FC<PaginationProps> = ({
  page,
  handlePageChange,
  totalPages,
  setPageSize,
  pageSize,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setPageSize(newItemsPerPage);
    handlePageChange(page, newItemsPerPage);
  };

  const handlePage = (event: ChangeEvent<unknown>, newPage: number) => {
    handlePageChange(newPage, pageSize);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePage}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
        <FormControl sx={{ minWidth: 120 }} size="small">
          <Select
            labelId="items-per-page-label"
            id="items-per-page-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <MenuItem value={5}>{STRINGS.PAGINATION_TEXT_FIVE_ITEMS}</MenuItem>
            <MenuItem value={10}>{STRINGS.PAGINATION_TEXT_TEN_ITEMS}</MenuItem>
            <MenuItem value={20}>
              {STRINGS.PAGINATION_TEXT_TOWENTY_ITEMS}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default PaginationComponent;
