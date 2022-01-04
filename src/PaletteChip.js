import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './PaletteChip.css';


function PaletteChip(props) {
  let navigate = useNavigate();
  const colors = props.palette.colors.map(c => (
    <div
      key={uuid()}
      className="PaletteChip-color"
      style={{ background: c.value }}
    >
    </div>
  ));

  function gotoPalette() {
    navigate(`/palette/${props.palette.id}`);
  }

  return (
    // <Link className="PaletteChip-link" to={`/palette/${props.palette.id}`}>
      <div className="PaletteChip" onClick={gotoPalette}>
        {colors}
        <h2 className="PaletteChip-name">{props.palette.paletteName}</h2>
      </div>
    // </Link>
  );
}


export default PaletteChip;