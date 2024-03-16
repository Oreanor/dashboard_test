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

import { Close } from "@mui/icons-material";
import { IUser } from "../../../interfaces";
import { UserProps } from "../../../types";

interface IProps {
  handleCloseEdit: () => void;
  openEdit: boolean;
  currentUser: IUser | null;
  handleConfirmEdit: () => void;
  handleUpdateUser: (field: UserProps, value: string) => void;
  hasEmail: boolean;
  hasFirstName: boolean;
  hasLastName: boolean;
}

function EditDialog(props: IProps) {
  const {
    handleCloseEdit,
    openEdit,
    currentUser,
    handleConfirmEdit,
    handleUpdateUser,
    hasEmail,
    hasFirstName,
    hasLastName,
  } = props;
  return (
    <Dialog
      onClose={handleCloseEdit}
      aria-labelledby="customized-dialog-title"
      open={openEdit}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, width: "400px" }}
        id="customized-dialog-title"
      >
        Edit user data
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseEdit}
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
            id="email-input"
            label="Email"
            variant="outlined"
            defaultValue={currentUser?.email}
            onChange={(event) => handleUpdateUser("email", event.target.value)}
            error={!hasEmail}
            helperText={!hasEmail ? "Email must be valid" : ""}
          />
          <TextField
            id="first-name-input"
            label="First name"
            variant="outlined"
            defaultValue={currentUser?.first_name}
            onChange={(event) =>
              handleUpdateUser("first_name", event.target.value)
            }
            error={!hasFirstName}
            helperText={!hasFirstName ? "First name cannot be empty" : ""}
          />
          <TextField
            id="last-name-input"
            label="Last name"
            variant="outlined"
            defaultValue={currentUser?.last_name}
            onChange={(event) =>
              handleUpdateUser("last_name", event.target.value)
            }
            error={!hasLastName}
            helperText={!hasLastName ? "Last name cannot be empty" : ""}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseEdit}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirmEdit}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
