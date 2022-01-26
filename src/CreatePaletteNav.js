import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import './CreatePaletteNav.css';


function CreatePaletteNav(props) {
  // props
  const { handleSavePalette, seedPalettes } = props;
  // state
  const [newPaletteName, setNewPaletteName] = useState('');

  const updateNewPaletteName = (e) => {
    setNewPaletteName(e.target.value);
  }

  function handleSubmit() {
    handleSavePalette(newPaletteName);
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

      {/* Palette name input */}
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label="Palette name"
          onChange={updateNewPaletteName}
          name="newPaletteName"
          variant="outlined"
          value={newPaletteName}
          size="small"
          sx={{ margin: '1rem 0 .75rem 0' }}
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
        />
        <button
          className="Btn Btn--save"
          type="submit"
        >
          Save
        </button>
      </ValidatorForm>

      <Link to={"/"} className="Btn Btn--exit">
        Close
      </Link>

    </React.Fragment>
  );
}


export default CreatePaletteNav;