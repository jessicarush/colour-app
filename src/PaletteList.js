import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import seedPalettes from './seedPalettes';
import PaletteChip from './PaletteChip';
import './PaletteList.css';


function PaletteList(props) {

  const palettes = seedPalettes.map(p => (
    <PaletteChip key={uuid()} palette={p} />
  ));

  return (
    <div className="PaletteList">
      <div className="PaletteList-head">
        <h1 className="PaletteList-header">
          <Link to={"/"}>&lt;Color Palettes /&gt;</Link>
        </h1>
        <button className="PaletteList-new-btn">+ create palette</button>
      </div>
      <div className="PaletteList-palettes">
        {/* Palettes go here */}
        { palettes }
      </div>
      <div className="PaletteList-footer">
        footer
      </div>
    </div>
  );
}


export default PaletteList;