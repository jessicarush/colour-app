import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';


function Navbar(props) {
  // State
  const [colorFormat, setColorFormat] = useState(props.colorFormat || 'hex');
  const [msgOpen, setMsgOpen] = React.useState(false);

  function handleColorFormatChange(e) {
    setColorFormat(e.target.value);
    props.updateColorFormat(e.target.value);
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
    <header className={`Navbar ${props.className}`}>
      <div className="Navbar-head">
        <h1 className="Navbar-header">
          <Link to={"/"}>&lt;Color Palettes /&gt;</Link>
        </h1>
      </div>

      {/* The slider is only rendered when level prop exists (Palette.js) */}
      {props.level && (
        <React.Fragment>
          <div className="Navbar-slider-label">
            <span>Level: {props.level} </span>
          </div>
          <div className="Navbar-slider">
            <Slider
              defaultValue={props.level}
              min={100}
              max={900}
              step={100}
              onAfterChange={props.updateLevel}
            />
          </div>
        </React.Fragment>
      )}

      <div className="Navbar-format">
        <FormControl variant="standard" fullWidth>
          <InputLabel
            id="color-format-label"
            sx={{
              fontSize: '.85rem'
            }}
          >
            Color values
          </InputLabel>
          <Select
            labelId="color-format-label"
            id="color-format"
            value={colorFormat}
            label="color-format"
            onChange={handleColorFormatChange}
            sx={{
              fontSize: '.75rem',
              fontWeight: '600'
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