import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './css/Navbar.css';


function Navbar(props) {
  // props
  const { level, updateLevel, updateColorFormat, NavbarClassName } = props;
  // state
  const [colorFormat, setColorFormat] = useState(props.colorFormat || 'hex');
  const [msgOpen, setMsgOpen] = React.useState(false);

  function handleColorFormatChange(e) {
    setColorFormat(e.target.value);
    updateColorFormat(e.target.value);
    handleMsgOpen();
  }

  function handleMsgOpen() {
    setMsgOpen(true);
  };

  function handleMsgClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setMsgOpen(false);
  };

  // The "action" renders after the message, at the end of the snackbar.
  const msgAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleMsgClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <header className={`Navbar ${NavbarClassName}`}>
      <div className="Navbar-head">
        <h1 className="Navbar-header">
          <Link to={"/"}>&lt;Colour Palettes /&gt;</Link>
        </h1>
      </div>

      {/* The slider is only rendered when level prop exists (Palette.js) */}
      {level && (
        <div className="Navbar-slider-items">
          <div className="Navbar-slider-label">
            <span>Level: {level} </span>
          </div>
          <div className="Navbar-slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={updateLevel}
            />
          </div>
        </div>
      )}

      <div className="Navbar-format">
        <FormControl variant="standard" fullWidth>
          <Select
            labelId="color-format-label"
            id="color-format"
            value={colorFormat}
            label="color-format"
            onChange={handleColorFormatChange}
            sx={{
              fontSize: '.8rem',
              fontWeight: '600',
              ':before': { borderBottomColor: '#fff' },
              // underline when selected
              // ':after': { borderBottomColor: 'green' },
            }}
          >
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={msgOpen}
        autoHideDuration={4000}
        message={
          <span id="message-id">
            Color format changed to {colorFormat.toUpperCase()}
          </span>
        }
        ContentProps={{ "aria-describedby": "message-id" }}
        action={msgAction}
        onClose={handleMsgClose}
      />
    </header>
  );
}


export default Navbar;