import React, { useState } from "react";
import chroma from 'chroma-js';
import DeleteIcon from '@mui/icons-material/Delete';
import { analyzeContrast } from './helpers';
import './DraggableChip.css';


function DraggableChip(props) {
  // props
  const { color, name, deleteColor } = props;

  const goodContrast = analyzeContrast("fff", color);
  const fontColor = goodContrast ? '#fff' : chroma(color).darken(3);

  function handleDeleteColor() {
    deleteColor(color);
  }

  return (
    <div className="DraggableChip" style={{ background: color }}>
      <div className="info-container">
        <h2 className="info-name" style={{ color: fontColor }} title={color}>
          {name}
        </h2>
        <button
          className="trash-icon-btn"
          title="Delete color"
          onClick={handleDeleteColor}
        >
          <DeleteIcon style={{ color: fontColor }} />
        </button>
      </div>
    </div>
  )
}

export default DraggableChip;