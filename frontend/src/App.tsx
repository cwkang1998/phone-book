import React, { useState, useEffect } from "react";
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

const AddContactDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone"
          type="tel"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [phones, setPhones] = useState([
    { name: "Test", phone: "+60169643600" },
  ]);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container sx={{ padding: "16px" }}>
        <Stack>
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="Search contacts" />
            <Button variant="contained" onClick={openDialog}>
              Add
            </Button>
          </Stack>
          <Stack>
            {phones.map((phone) => (
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
                    {phone.phone}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
      <AddContactDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default App;
