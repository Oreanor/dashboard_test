import { useEffect, useState } from "react";
import { USERS_PER_PAGE } from "../../consts";
import { IUser } from "../../interfaces";
import { getUsers, deleteUser, createUser, updateUser } from "../../services";
import { UserProps } from "../../types";
import { Edit, Delete } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteDialog from "./Dialogs/DeleteDialog";
import EditDialog from "./Dialogs/EditDialog";
import AddDialog from "./Dialogs/AddDialog";
import TablePagination from "./TablePagination";

function UserTable() {
  const [page, setPage] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersTotal, setUsersTotal] = useState<number>(0);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [localPage, setLocalPage] = useState<number>(1);
  const [localPagesTotal, setLocalPagesTotal] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasEmail, setHasEmail] = useState<boolean>(true);
  const [hasFirstName, setHasFirstName] = useState<boolean>(true);
  const [hasLastName, setHasLastName] = useState<boolean>(true);
  const [newId, setNewId] = useState<number>(-1);

  //Fetching on mount
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setIsLoading(true);
        const res = await getUsers(1);
        setIsLoading(false);
        setUsers(res.data);
        setLocalPagesTotal(res.total_pages);
        setPagesTotal(res.total_pages);
        setUsersTotal(res.total);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsersData();
  }, []);

  //Loading more users
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setIsLoading(true);
        const res = await getUsers(page + 1);
        setIsLoading(false);
        setUsers((users) => [...users, ...res.data]);
        setPage(page + 1);
      } catch (e) {
        console.log(e);
      }
    };

    if (users.length < localPage * USERS_PER_PAGE && page < pagesTotal) {
      fetchUsersData();
    }
  }, [localPage, page, pagesTotal, users]);

  //Updating pages/total
  useEffect(() => {
    const newTotalPages = Math.ceil(usersTotal / USERS_PER_PAGE) || 1;
    setLocalPagesTotal(newTotalPages);
    if (newTotalPages < localPage) {
      setLocalPage(newTotalPages);
    }
  }, [usersTotal, localPage]);

  //Add user handling
  const handleOpenAdd = () => {
    setOpenAdd(true);
    setCurrentUser({
      id: newId,
      email: "",
      first_name: "",
      last_name: "",
    });
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleConfirmAdd = async () => {
    if (checkErrors() && currentUser) {
      const usersCopy = [currentUser, ...users];
      setUsers(usersCopy);
      setOpenAdd(false);
      setCurrentUser(null);
      setNewId(newId - 1);
      setUsersTotal(usersTotal + 1);
      try {
        await createUser(currentUser);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //Edit user handling
  const handleOpenEdit = (id: number) => {
    setOpenEdit(true);
    const currUser = findUser(id);
    setCurrentUser(currUser);
  };

  const handleConfirmEdit = async () => {
    if (checkErrors() && currentUser) {
      const index = users.findIndex((user) => user.id === currentUser.id);
      const usersCopy = [...users];
      usersCopy[index] = { ...currentUser };
      setUsers(usersCopy);
      setOpenEdit(false);
      setCurrentUser(null);
      try {
        await updateUser(currentUser);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //Delete user handling
  const handleOpenDelete = (id: number) => {
    setOpenDelete(true);
    const userToDelete = findUser(id);
    setCurrentUser(userToDelete);
  };

  const handleConfirmDelete = async () => {
    const filteredUsers = currentUser
      ? users.filter((user) => user.id !== currentUser.id)
      : users;
    setOpenDelete(false);
    setUsers(filteredUsers);
    setCurrentUser(null);
    setUsersTotal(usersTotal - 1);

    try {
      currentUser?.id && (await deleteUser(currentUser.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseDelete = () => setOpenDelete(false);

  //Pages navigation
  const prevPage = () => {
    setLocalPage(localPage - 1);
  };
  const nextPage = () => {
    setLocalPage(localPage + 1);
  };

  const findUser = (id: number) => users.find((user) => user.id === id) || null;

  const handleUpdateUser = (field: UserProps, value: string) => {
    if (currentUser) {
      const user = { ...currentUser, [field]: value };
      setCurrentUser(user);
    }
  };

  const checkErrors = (): boolean => {
    if (currentUser) {
      const isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        currentUser.email
      );
      const isFirstNameValid = currentUser.first_name !== "";
      const isLastNameValid = currentUser.last_name !== "";

      setHasEmail(isEmailValid);
      setHasFirstName(isFirstNameValid);
      setHasLastName(isLastNameValid);

      return isEmailValid && isFirstNameValid && isLastNameValid;
    } else return false;
  };

  return (
    <>
      <Stack>
        <Button
          data-cy="add-button"
          sx={{ width: "150px" }}
          variant="contained"
          onClick={handleOpenAdd}
        >
          Add user
        </Button>
        <TableContainer data-cy="table-container">
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress sx={{ m: 2 }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : users.length > 0 ? (
              <>
                <TableBody>
                  {users
                    .slice(
                      (localPage - 1) * USERS_PER_PAGE,
                      localPage * USERS_PER_PAGE
                    )
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Avatar
                            alt={`${row.first_name} ${row.last_name}`}
                            src={row.avatar}
                          />
                        </TableCell>
                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.last_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <IconButton
                            data-cy={`edit-button-${row.id}`}
                            onClick={() => row.id && handleOpenEdit(row.id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            data-cy={`delete-button-${row.id}`}
                            onClick={() => row.id && handleOpenDelete(row.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography>No users data</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          localPage={localPage}
          localPagesTotal={localPagesTotal}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Stack>

      <DeleteDialog
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        currentUser={currentUser}
        handleConfirmDelete={handleConfirmDelete}
      />
      <EditDialog
        handleCloseEdit={handleCloseEdit}
        openEdit={openEdit}
        currentUser={currentUser}
        handleConfirmEdit={handleConfirmEdit}
        handleUpdateUser={handleUpdateUser}
        hasEmail={hasEmail}
        hasFirstName={hasFirstName}
        hasLastName={hasLastName}
      />
      <AddDialog
        handleCloseAdd={handleCloseAdd}
        openAdd={openAdd}
        currentUser={currentUser}
        handleConfirmAdd={handleConfirmAdd}
        handleUpdateUser={handleUpdateUser}
        hasEmail={hasEmail}
        hasFirstName={hasFirstName}
        hasLastName={hasLastName}
      />
    </>
  );
}

export default UserTable;
