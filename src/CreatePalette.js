import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SketchPicker, ChromePicker } from 'react-color';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TuneIcon from '@mui/icons-material/Tune';
import './CreatePalette.css';

// The color picker component is the main factor for drawer width
const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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


function CreatePalette(props) {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#3ccaa2");
  const [colors, setColors] = useState(["#b9b9b9", "#cbcbcb", "#dbdbdb", "#ebebeb"])

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
    setColors([...colors, currentColor])
  }

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
          <SketchPicker
            color={currentColor}
            className="CreatePalette-picker"
            onChangeComplete={ handlePickerChange }
            disableAlpha={true}
            width="210px"
          />
          <div className="CreatePalette-drawer-btns">
            <button className="CreatePalette-Btn CreatePalette-Btn--plain">
              Random color
            </button>
            <button className="CreatePalette-Btn CreatePalette-Btn--plain">
              Clear palette
            </button>
            <TextField
              id="color-name"
              label="Color name"
              variant="outlined"
              size="small"
              sx={{marginTop: '2rem'}}
              fullWidth
            />
            <button
              className="CreatePalette-Btn CreatePalette-Btn--add"
              onClick={addNewColor}
            >
              <span
                className="CreatePalette-Btn--add-chip"
                style={{background: currentColor}}
              ></span>
              Add color
            </button>
          </div>

        </div>
      </Drawer>
      {/* Palette ----------------------------------------------------------- */}
      <Main className="CreatePalette-palette" open={open}>
        <DrawerHeader /> {/* used as a spacer for the Drawer Header above */}
          {colors.map(color => (
            <p>{color}</p>
          ))}
      </Main>
    </Box>
  );
}


export default CreatePalette;