import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './PaletteChip.css';


function PaletteChip(props) {

  const colors = props.palette.colors.map(c => (
    <div
      key={uuid()}
      className="PaletteChip-color"
      style={{ background: c.value }}
    >
    </div>
  ));

  return (
    <Link className="PaletteChip-link" to={`/palette/${props.palette.id}`}>
      <div className="PaletteChip">
        {colors}
        <h2 className="PaletteChip-name">{props.palette.paletteName}</h2>
      </div>
    </Link>
  );
}


export default PaletteChip;