import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

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
      <IconButton
        data-cy="prev-button"
        disabled={localPage === 1}
        onClick={prevPage}
      >
        <NavigateBefore />
      </IconButton>
      <Typography
        data-cy="page-of"
        variant="body2"
        sx={{ display: "inline-block", ml: 1, mr: 1 }}
      >
        {`Page: ${localPage} of ${localPagesTotal}`}
      </Typography>
      <IconButton
        data-cy="next-button"
        disabled={localPage === localPagesTotal}
        onClick={nextPage}
      >
        <NavigateNext />
      </IconButton>
    </Box>
  );
}

export default TablePagination;
