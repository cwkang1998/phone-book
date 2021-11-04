import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const API_URL = "http://localhost:8000";

const AddContactDialog = ({
  open,
  handleClose,
  handleAdd,
}: {
  open: boolean;
  handleClose: () => void;
  handleAdd: (name: string, phone: string) => void;
}) => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddSubmit = () => {
    handleAdd(formData.name, formData.phone);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={onFormChange}
          required
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="tel"
          fullWidth
          variant="standard"
          onChange={onFormChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onAddSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [phones, setPhones] = useState<{ name: string; phone_no: string }[]>(
    []
  );
  const [filteredPhones, setFilteredPhones] = useState<
    { name: string; phone_no: string }[]
  >([]);

  const getPhoneData = async () => {
    const res = await fetch(`${API_URL}/contact/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setPhones(data);
    setFilteredPhones(data);
  };

  useEffect(() => {
    getPhoneData();
  }, []);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (name: string, phone: string) => {
    const res = await fetch(`${API_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone_no: phone }),
    });
    const data = await res.json();
    console.log(data);
    await getPhoneData();
  };

  const searchByText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const filteredRes = phones.filter((p) => p.name.includes(e.target.value));
      setFilteredPhones(filteredRes);
    } else {
      setFilteredPhones(phones);
    }
  };

  return (
    <>
      <Container sx={{ padding: "16px" }}>
        <Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Search contacts"
              onChange={searchByText}
            />
            <Button variant="contained" onClick={openDialog}>
              Add
            </Button>
          </Stack>
          <Stack>
            {filteredPhones.map((phone) => (
              <Card sx={{ margin: "16px" }} elevation={3}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {phone.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {phone.phone_no}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
      <AddContactDialog
        open={open}
        handleClose={handleClose}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default App;
