import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SketchPicker, ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { arrayMove } from 'react-sortable-hoc';
import chroma from 'chroma-js';

import { toKebabCase } from './helpers';
import SortableList from './SortableList';
import './CreatePalette.css';


const starterColors = [
  { name: 'light gray', value: '#b9b9b9' },
  { name: 'silver', value: '#cbcbcb' },
  { name: 'fog', value: '#dbdbdb' },
  { name: 'mist', value: '#ebebeb' }
];

/* Material UI drawer stuff ------------------------------------------------ */

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

/* Component---------------------------------------------------------------- */

function CreatePalette(props) {
  // props
  const { savePalette, seedPalettes, maxColors=20 } = props;
  // state
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('#3ccaa2');
  const [newColorName, setNewColorName] = useState('');
  const [colors, setColors] = useState(starterColors);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePickerChange = (color) => {
    setCurrentColor(color.hex);
  };

  const updateNewColorName = (e) => {
    setNewColorName(e.target.value);
  }

  const updateNewPaletteName = (e) => {
    setNewPaletteName(e.target.value);
  }

  const clearPalette = () => {
    setColors([]);
  };

  const setRandomColor = () => {
    let randomColor = chroma.random().hex();
    setCurrentColor(randomColor);
  }

  function addNewColor() {
    // Check that new color value doesn't already exist. This validation
    // should happen on submit, whereas the ValidatorForm validation happens
    // on change (of the input field) which doesn't work for checking the
    // current color value.
    let existingColor = colors.filter(c => c.value === currentColor)[0];
    if (!existingColor) {
      let newColor = { name: newColorName.trim(), value: currentColor };
      setColors([...colors, newColor]);
      setNewColorName('');
      setMsg('');
    } else {
      setMsg(
        `You already have the colour ${currentColor} in your palette. ` +
        `It's called ${existingColor.name}.`
      );
    }
  }

  function deleteColor(color) {
    let updatedColors = colors.filter(c => c.value !== color);
    setColors(updatedColors);
  }

  function handleSavePalette() {
    const newPalette = {
      paletteName: newPaletteName.trim(),
      id: toKebabCase(newPaletteName),
      colors: colors
    }
    savePalette(newPalette);
    navigate('/');
  }

  /* Custom validators for TextValidator ----------------------------------- */
  useEffect(() => {
    ValidatorForm.addValidationRule('colorNameUnique', (value) => {
      return colors.every(c => c.name.toLowerCase() !== value.trim().toLowerCase());
    });
  }, [colors]);
  useEffect(() => {
    ValidatorForm.addValidationRule('paletteNameUnique', (value) => {
      return seedPalettes.every(p => p.paletteName.toLowerCase() !== value.trim().toLowerCase());
    });
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(colors => arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <Box className="CreatePalette" sx={{ display: 'flex' }}>
      {/* Header bar -------------------------------------------------------- */}
      {/* <CssBaseline /> */} {/* <-- fuck this */}
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

            {/* Palette name input */}
            <ValidatorForm
              onSubmit={handleSavePalette}
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
                className="CreatePalette-Btn CreatePalette-Btn--save"
                type="submit"
              >
                Save
              </button>
            </ValidatorForm>

            <Link to={"/"} className="CreatePalette-Btn CreatePalette-Btn--exit">
              Close
            </Link>

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
          <h2 className="CreatePalette-drawer-header">Add colours</h2>
          <p className="CreatePalette-drawer-subheader">
            to build your new palette.
          </p>
          <ChromePicker
            color={currentColor}
            className="CreatePalette-picker"
            onChangeComplete={handlePickerChange}
            disableAlpha={true}
            width="230px"
          />
          <ValidatorForm
            onSubmit={addNewColor}
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
              className="CreatePalette-Btn CreatePalette-Btn--add"
              title="Add colour"
              disabled={paletteIsFull}
            >
              <span
                className="CreatePalette-Btn--add-chip"
                style={{ background: currentColor }}
              ></span>
              <AddIcon />
            </button>
          </ValidatorForm>

          {paletteIsFull && (
            <p className='CreatePalette-msg'>
              <span>Your palette is full. </span>
              Palettes may have up to {maxColors} colours. You can delete some of your colours if you want to add different ones.
            </p>
          )}

          {msg && (
            <p className='CreatePalette-msg'>
              <span>Duplicate! </span>
              {msg}
            </p>
          )}

          <div className="CreatePalette-drawer-btns">
            <button
              className="CreatePalette-Btn CreatePalette-Btn--plain"
              onClick={setRandomColor}
            >
              Random colour
            </button>
            <button
              className="CreatePalette-Btn CreatePalette-Btn--plain"
              onClick={clearPalette}
            >
              Clear palette
            </button>
          </div>
        </div>
      </Drawer>
      {/* Main content (palette) -------------------------------------------- */}
      <Main className="CreatePalette-main" open={open}>
        <DrawerHeader /> {/* used as a spacer for the Drawer Header above */}

        <SortableList
          colors={ colors }
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={2}
        />

      </Main>
    </Box>
  );
}


export default CreatePalette;