import React, { useState } from "react";
import chroma from 'chroma-js';
import DeleteIcon from '@mui/icons-material/Delete';
import { analyzeContrast } from './helpers';
import './DraggableChip.css';


function DraggableChip(props) {

  const goodContrast = analyzeContrast("fff", props.color);
  const fontColor = goodContrast ? '#fff' : chroma(props.color).darken(3);
  const btnBgColor = goodContrast ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.35)';

  return (
    <div className="DraggableChip" style={{ background: props.color }}>
      <div className="info-container">
        <h2 className="info-name" style={{ color: fontColor }} title={props.color}>
          {props.name}
        </h2>
        <button className="trash-icon-btn" title="Delete color">
          <DeleteIcon style={{ color: fontColor }} />
        </button>
      </div>
    </div>
  )
}

export default DraggableChip;