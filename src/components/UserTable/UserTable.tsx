//import { ITEMS_PER_PAGE } from "../../consts";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import { getUsers } from "../../services";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Close,
  Edit,
  Delete,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

function UserTable() {
  const [page, setPage] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(2);
  const [users, setUsers] = useState<IUser[]>([]);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      const res = await getUsers(page);
      setUsers(res.data);
      console.log(res);
      setPagesTotal(res.total_pages);
    };

    fetchUsersData();
  }, [page]);

  const handleOpenEdit = (id: number) => {
    setOpenEdit(true);
    setCurrentUser(id);
  };

  const handleConfirmEdit = () => {
    //edit userdata
    setOpenEdit(false);
    setCurrentUser(null);
    //call API
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (id: number) => {
    setOpenDelete(true);
    setCurrentUser(id);
  };

  const handleConfirmDelete = () => {
    const filteredUsers = users.filter((user) => user.id !== currentUser);
    setUsers(filteredUsers);
    setOpenDelete(false);
    setCurrentUser(null);
    //call API
  };

  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <>
      <Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 &&
                users.map((row) => (
                  <TableRow key={row.email}>
                    <TableCell>
                      <Avatar
                        alt={row.first_name + " " + row.last_name}
                        src={row.avatar}
                      />
                    </TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Edit
                        sx={{ mr: 2, cursor: "pointer" }}
                        onClick={() => handleOpenEdit(row.id)}
                      />
                      <Delete
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleOpenDelete(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: 1,
          }}
        >
          <IconButton disabled={page === 1} onClick={() => setPage(page - 1)}>
            <NavigateBefore />
          </IconButton>
          <Typography
            variant="body2"
            sx={{ display: "inline-block", ml: 1, mr: 1 }}
          >
            Page: {page} of {pagesTotal}
          </Typography>
          <IconButton
            disabled={page === pagesTotal}
            onClick={() => setPage(page + 1)}
          >
            <NavigateNext />
          </IconButton>
        </Box>
      </Stack>

      <Dialog
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
          <Typography>Delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
          <Typography>Editing user</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmEdit}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserTable;
