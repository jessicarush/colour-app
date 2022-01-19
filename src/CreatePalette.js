/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { SketchPicker, ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import DraggableChip from './DraggableChip';
import './CreatePalette.css';


const starterColors = [
  { name: 'light gray', value: '#b9b9b9' },
  { name: 'silver', value: '#cbcbcb' },
  { name: 'fog', value: '#dbdbdb' },
  { name: 'mist', value: '#ebebeb' }
];

{/* Material UI drawer stuff ------------------------------------------------ */ }

// The color picker component is the main factor for drawer width
const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

{/* Component---------------------------------------------------------------- */ }

function CreatePalette(props) {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#3ccaa2");
  const [newColorName, setNewColorName] = useState("");
  const [colors, setColors] = useState(starterColors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePickerChange = (color) => {
    setCurrentColor(color.hex);
  };

  const addNewColor = () => {
    // Check that new color value doesn't already exist. This validation
    // should happen on submit, whereas the ValidatorForm validation happens
    // on change (of the input field) which doesn't work for checking the
    // current color value.
    let isColorUnique = colors.every(
      c => c.value.toLowerCase() !== currentColor.toLowerCase()
    );
    console.log(isColorUnique);
    if (isColorUnique) {
      let newColor = { name: newColorName, value: currentColor };
      setColors([...colors, newColor]);
      setNewColorName('');
    } else {
      console.log('fuck yew');
    }
  }

  const updateNewColorName = (e) => {
    setNewColorName(e.target.value);
  }

  useEffect(() => {
    // Add custom validation rules
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(c => c.name.toLowerCase() !== value.toLowerCase());
    });
  }, [colors]);

  return (
    <Box className="CreatePalette" sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */} {/* <-- fuck this */}
      {/* Header bar -------------------------------------------------------- */}
      <AppBar position="fixed" open={open} sx={{
        background: "#fff",
        color: "#000",
        boxShadow: "none",
      }}>
        <Toolbar className="CreatePalette-toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <TuneIcon sx={{ fontSize: '1.4rem' }} />
          </IconButton>
          <h1 className="CreatePalette-toolbar-header">Create a palette</h1>
          <Stack spacing={.5} direction="row">
            <button className="CreatePalette-Btn CreatePalette-Btn--save">
              Save
            </button>
            <Link to={"/"} className="CreatePalette-Btn CreatePalette-Btn--exit">
              Close
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Drawer ------------------------------------------------------------ */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <div className="CreatePalette-drawer">
          <h2 className="CreatePalette-drawer-header">New color palette</h2>
          <p className="CreatePalette-drawer-subheader">
            Add colors to build your new palette.
          </p>
          <ChromePicker
            color={currentColor}
            className="CreatePalette-picker"
            onChangeComplete={handlePickerChange}
            disableAlpha={true}
            width="230px"
          />
          {/* <TextField
            id="color-name"
            label="Color name"
            variant="outlined"
            size="small"
            sx={{ margin: '1rem 0 .75rem 0' }}
            fullWidth
          />
          <button
            className="CreatePalette-Btn CreatePalette-Btn--add"
            onClick={addNewColor}
            title="Add color"
          >
            <span
              className="CreatePalette-Btn--add-chip"
              style={{ background: currentColor }}
            ></span>
            <AddIcon />
          </button> */}

          <ValidatorForm
            onSubmit={addNewColor}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              label="Color name"
              onChange={updateNewColorName}
              name="color-name"
              variant="outlined"
              value={newColorName}
              size="small"
              sx={{ margin: '1rem 0 .75rem 0' }}
              fullWidth
              validators={['required', 'isColorNameUnique']}
              errorMessages={[
                'This field is required.',
                'Color names must be unique.'
              ]}
            />
            {/* <Button type="submit">Submit</Button> */}
            <button
              type="submit"
              className="CreatePalette-Btn CreatePalette-Btn--add"
              title="Add color"
            >
              <span
                className="CreatePalette-Btn--add-chip"
                style={{ background: currentColor }}
              ></span>
              <AddIcon />
            </button>
          </ValidatorForm>

          <div className="CreatePalette-drawer-btns">
            <button className="CreatePalette-Btn CreatePalette-Btn--plain">
              Random color
            </button>
            <button className="CreatePalette-Btn CreatePalette-Btn--plain">
              Clear palette
            </button>
          </div>
        </div>
      </Drawer>
      {/* Main content (palette) -------------------------------------------- */}
      <Main className="CreatePalette-main" open={open}>
        <DrawerHeader /> {/* used as a spacer for the Drawer Header above */}
        <div className="CreatePalette-chips">
          {colors.map(color => (
            <DraggableChip key={uuid()} color={color.value} name={color.name} />
          ))}
        </div>
      </Main>
    </Box>
  );
}


export default CreatePalette;