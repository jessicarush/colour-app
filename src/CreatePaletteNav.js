import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import './css/CreatePaletteNav.css';


function CreatePaletteNav(props) {
  // props
  const { handleSavePalette, seedPalettes } = props;
  // state
  const [newPaletteName, setNewPaletteName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateNewPaletteName = (e) => {
    setNewPaletteName(e.target.value);
  }

  const handleSubmit = () => {
    handleSavePalette(newPaletteName);
    setDialogOpen(false);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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
      <Stack spacing={.5} direction="row" className="CreatePaletteNav-btns">
        <Link to={"/"} className="CreatePaletteNav-close btn btn--exit">
          <span className="long">Close</span>
          <span className="short"><CloseIcon fontSize="small" /></span>
        </Link>
        <button className="CreatePaletteNav-save btn btn--save" onClick={handleClickOpen}>
          <span className="long">Save</span>
          <span className="short"><CheckIcon fontSize="small" /></span>
        </button>
      </Stack>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}
        >
          <DialogTitle>
            Choose a palette name
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
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
            <button className="btn btn--exit" onClick={handleClose}>Cancel</button>
            <button className="btn btn--save" type="submit">Save Palette</button>
          </DialogActions>

        </ValidatorForm>
      </Dialog>

    </React.Fragment>
  );
}


export default CreatePaletteNav;