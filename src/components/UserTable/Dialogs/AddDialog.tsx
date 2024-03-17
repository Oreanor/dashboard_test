import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { INPUT_MAX_LENGTH } from "../../../consts";
import { IUser } from "../../../interfaces";
import { UserProps } from "../../../types";

interface IProps {
  handleCloseAdd: () => void;
  openAdd: boolean;
  currentUser: IUser | null;
  handleConfirmAdd: () => void;
  handleUpdateUser: (field: UserProps, value: string) => void;
  hasEmail: boolean;
  hasFirstName: boolean;
  hasLastName: boolean;
}

function AddDialog(props: IProps) {
  const {
    handleCloseAdd,
    openAdd,
    currentUser,
    handleConfirmAdd,
    handleUpdateUser,
    hasEmail,
    hasFirstName,
    hasLastName,
  } = props;
  return (
    <Dialog onClose={handleCloseAdd} aria-labelledby="add-title" open={openAdd}>
      <DialogTitle
        sx={{ m: 0, p: 2, width: "400px" }}
        id="add-title"
        data-cy="add-title"
      >
        Add user
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseAdd}
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
        <Stack spacing={2}>
          <TextField
            data-cy="email-input-add"
            id="email-input-add"
            label="Email"
            variant="outlined"
            defaultValue={currentUser?.email}
            onChange={(event) => handleUpdateUser("email", event.target.value)}
            error={!hasEmail}
            helperText={!hasEmail ? "Email must be valid" : ""}
            inputProps={{
              maxLength: INPUT_MAX_LENGTH,
            }}
          />
          <TextField
            data-cy="first-name-input-add"
            id="first-name-input-add"
            label="First name"
            variant="outlined"
            defaultValue={currentUser?.first_name}
            onChange={(event) =>
              handleUpdateUser("first_name", event.target.value)
            }
            error={!hasFirstName}
            helperText={!hasFirstName ? "First name cannot be empty" : ""}
            inputProps={{
              maxLength: INPUT_MAX_LENGTH,
            }}
          />
          <TextField
            data-cy="last-name-input-add"
            id="last-name-input-add"
            label="Last name"
            variant="outlined"
            defaultValue={currentUser?.last_name}
            onChange={(event) =>
              handleUpdateUser("last_name", event.target.value)
            }
            error={!hasLastName}
            helperText={!hasLastName ? "Last name cannot be empty" : ""}
            inputProps={{
              maxLength: INPUT_MAX_LENGTH,
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          data-cy="add-cancel-button"
          variant="outlined"
          onClick={handleCloseAdd}
        >
          Cancel
        </Button>
        <Button
          data-cy="add-save-button"
          variant="contained"
          onClick={handleConfirmAdd}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
