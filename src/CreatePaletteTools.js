import React, { useState, useEffect } from 'react';
import { SketchPicker, ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AddIcon from '@mui/icons-material/Add';
import chroma from 'chroma-js';

import './CreatePaletteTools.css';


function CreatePaletteTools(props) {
  // props
  const {
    addNewColor,
    clearPalette,
    maxColors,
    colors
  } = props;
  // state
  const [currentColor, setCurrentColor] = useState('#3ccaa2');
  const [newColorName, setNewColorName] = useState('');
  const [duplicateColor, setDuplicateColor] = useState('');

  const paletteIsFull = colors.length >= maxColors;

  const handlePickerChange = (color) => {
    setCurrentColor(color.hex);
  };

  const updateNewColorName = (e) => {
    setNewColorName(e.target.value);
  }

  const setRandomColor = () => {
    let randomColor = chroma.random().hex();
    setCurrentColor(randomColor);
  }

  function handleAddNewColor() {
    // Check that new color value doesn't already exist. This validation
    // should happen on submit, whereas the ValidatorForm validation happens
    // on change (of the input field) which doesn't work for checking the
    // current color value.
    let existingColor = colors.filter(c => c.value === currentColor)[0];
    if (!existingColor) {
      let newColor = {name: newColorName.trim(), value: currentColor};
      addNewColor(newColor);
      setNewColorName('');
      setDuplicateColor('');
    } else {
      setDuplicateColor(existingColor.name);
    }
  }

  /* Custom validators for TextValidator ----------------------------------- */
  useEffect(() => {
    ValidatorForm.addValidationRule('colorNameUnique', (value) => {
      return colors.every(c => c.name.toLowerCase() !== value.trim().toLowerCase());
    });
  }, [colors]);

  return (
    <div className="CreatePaletteTools">

      <h2 className="CreatePaletteTools-header">Add colours</h2>
      <p className="CreatePaletteTools-subheader">
        to build your new palette.
      </p>
      <ChromePicker
        color={currentColor}
        className="CreatePaletteTools-picker"
        onChangeComplete={handlePickerChange}
        disableAlpha={true}
        width="230px"
      />
      <ValidatorForm
        onSubmit={handleAddNewColor}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label="Color name"
          onChange={updateNewColorName}
          name="newColorName"
          variant="outlined"
          value={newColorName}
          size="small"
          sx={{ margin: '1rem 0 .75rem 0' }}
          fullWidth
          validators={[
            'required',
            'colorNameUnique',
            'maxStringLength:32',
            'matchRegexp:^[0-9A-Za-z #-]+$'
          ]}
          errorMessages={[
            'Give this color a name.',
            'Color names must be unique.',
            'Too long! Max 32 characters.',
            'No special characters please.'
          ]}
        />
        <button
          type="submit"
          className="Btn Btn--CreatePaletteTools-add"
          title="Add colour"
          disabled={paletteIsFull}
        >
          <span
            className="Btn--CreatePaletteTools-add__chip"
            style={{ background: currentColor }}
          ></span>
          <AddIcon />
        </button>
      </ValidatorForm>

      {paletteIsFull && (
        <p className='CreatePaletteTools-msg'>
          <span>Your palette is full. </span>
          Palettes may have up to {maxColors} colours. You can delete some of your colours if you want to add different ones.
        </p>
      )}

      {duplicateColor && (
        <p className='CreatePaletteTools-msg'>
          <span>Duplicate! </span>
          You already have the colour {currentColor} in your palette.
          It's called {duplicateColor}.
        </p>
      )}

      <div className="CreatePaletteTools-btn-set">
        <button className="Btn Btn--plain" onClick={setRandomColor}>
          Random colour
        </button>
        <button className="Btn Btn--plain" onClick={clearPalette}>
          Clear palette
        </button>
      </div>
    </div>
  );
}


export default CreatePaletteTools;