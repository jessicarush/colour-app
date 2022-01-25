import React, { useState } from 'react';
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
import './CreatePaletteNav.css';


function CreatePaletteNav(props) {
  const [name, setName] = useState('');


  return (
    <div className="CreatePaletteNav">

    </div>
  );
}


export default CreatePaletteNav;