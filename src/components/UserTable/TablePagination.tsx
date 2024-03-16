import { Box, IconButton, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface IProps {
  localPage: number;
  localPagesTotal: number;
  prevPage: () => void;
  nextPage: () => void;
}

function TablePagination(props: IProps) {
  const { localPage, localPagesTotal, prevPage, nextPage } = props;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: 1,
      }}
    >
      <IconButton disabled={localPage === 1} onClick={prevPage}>
        <NavigateBefore />
      </IconButton>
      <Typography
        variant="body2"
        sx={{ display: "inline-block", ml: 1, mr: 1 }}
      >
        Page: {localPage} of {localPagesTotal}
      </Typography>
      <IconButton disabled={localPage === localPagesTotal} onClick={nextPage}>
        <NavigateNext />
      </IconButton>
    </Box>
  );
}

export default TablePagination;
