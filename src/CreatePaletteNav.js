import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import './css/CreatePaletteNav.css';


function CreatePaletteNav(props) {
  // props
  const { handleSavePalette, seedPalettes } = props;
  // state
  const [newPaletteName, setNewPaletteName] = useState('');
  const [open, setOpen] = useState(false);

  const updateNewPaletteName = (e) => {
    setNewPaletteName(e.target.value);
  }

  const handleSubmit = () => {
    handleSavePalette(newPaletteName);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  /* Custom validators for TextValidator ----------------------------------- */
  useEffect(() => {
    ValidatorForm.addValidationRule('paletteNameUnique', (value) => {
      return seedPalettes.every(p => p.paletteName.toLowerCase() !== value.trim().toLowerCase());
    });
  });

  return (
    <React.Fragment>

      <h1 className="CreatePaletteNav-header">Create a palette</h1>
      <Stack spacing={.5} direction="row">
        <Link to={"/"} className="Btn Btn--exit">
          Close
        </Link>
        <button className="Btn Btn--save" onClick={handleClickOpen}>
          Save
        </button>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}
        >
          <DialogTitle className="SavePaletteDialog-title">
            Choose a palette name
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="SavePaletteDialog-text">
              Note: palette names must be unique,
              and a maximum length of 32 characters.
            </DialogContentText>

            {/* Palette name input */}
            <TextValidator
              label="Palette name"
              onChange={updateNewPaletteName}
              name="newPaletteName"
              variant="standard"
              value={newPaletteName}
              // size="small"
              // sx={{ margin: '1rem 0 .75rem 0' }}
              fullWidth
              validators={[
                'required',
                'paletteNameUnique',
                'maxStringLength:32',
                'matchRegexp:^[0-9A-Za-z #-]+$'
              ]}
              errorMessages={[
                'Give this palette a name.',
                'This palette name is already taken.',
                'Too long! Max 32 characters.',
                'No special characters please.'
              ]}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <button className="Btn Btn--exit" onClick={handleClose}>Cancel</button>
            <button className="Btn Btn--save" type="sumbit">Save Palette</button>
          </DialogActions>

        </ValidatorForm>
      </Dialog>

    </React.Fragment>
  );
}


export default CreatePaletteNav;