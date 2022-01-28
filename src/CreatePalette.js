import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TuneIcon from '@mui/icons-material/Tune';
import { arrayMove } from 'react-sortable-hoc';

import { toKebabCase } from './helpers';
import CreatePaletteNav from './CreatePaletteNav';
import CreatePaletteTools from './CreatePaletteTools';
import SortableList from './SortableList';
import './css/CreatePalette.css';


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

/* Main Component ------------------------------------------------------------ */

function CreatePalette(props) {
  // props
  const { savePalette, seedPalettes, maxColors=20 } = props;
  // state
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [colors, setColors] = useState(starterColors);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(colors => arrayMove(colors, oldIndex, newIndex));
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const deleteColor = (color) => {
    let updatedColors = colors.filter(c => c.value !== color);
    setColors(updatedColors);
  };

  const clearPalette = () => {
    setColors([]);
  };

  function handleSavePalette(newPaletteName) {
    const newPalette = {
      paletteName: newPaletteName.trim(),
      id: toKebabCase(newPaletteName),
      colors: colors
    }
    savePalette(newPalette);
    navigate('/');
  }

  return (
    <Box className="CreatePalette" sx={{ display: 'flex' }}>
      {/* MUI App bar -------------------------------------------------------- */}

      <AppBar position="fixed" open={drawerOpen} sx={{
        background: "whitesmoke",
        color: "#000",
        boxShadow: "none",
      }}>
        <Toolbar className="CreatePalette-toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <TuneIcon sx={{ fontSize: '1.4rem' }} />
          </IconButton>

          <CreatePaletteNav
            handleSavePalette={handleSavePalette}
            seedPalettes={seedPalettes}
          />

        </Toolbar>
      </AppBar>
      {/* MUI Drawer -------------------------------------------------------- */}
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
        open={drawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <CreatePaletteTools
          addNewColor={addNewColor}
          clearPalette={clearPalette}
          maxColors={maxColors}
          colors={colors}
        />

      </Drawer>
      {/* MUI Main content -------------------------------------------------- */}
      <Main className="CreatePalette-main" open={drawerOpen}>
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