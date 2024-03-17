import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { IUser } from "../../../interfaces";

interface IProps {
  handleCloseDelete: () => void;
  openDelete: boolean;
  currentUser: IUser | null;
  handleConfirmDelete: () => void;
}

function DeleteDialog(props: IProps) {
  const { handleCloseDelete, openDelete, currentUser, handleConfirmDelete } =
    props;
  return (
    <Dialog
      data-cy="delete-dialog"
      onClose={handleCloseDelete}
      aria-labelledby="customized-dialog-title"
      open={openDelete}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, width: "400px" }}
        id="customized-dialog-title"
      >
        Delete confirmation
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDelete}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Typography>
          {currentUser &&
            `Delete ${currentUser.first_name} ${currentUser.last_name}?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          data-cy="cancel-delete-button"
          variant="outlined"
          onClick={handleCloseDelete}
        >
          Cancel
        </Button>
        <Button
          data-cy="confirm-delete-button"
          variant="contained"
          onClick={handleConfirmDelete}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
