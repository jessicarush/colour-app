import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ColorChip from './ColorChip';
import Navbar from './Navbar';
import seedPalettes from './seedPalettes';
import generatePalette from './helpers';
import './Palette.css';
import NotFound from './NotFound';


function Palette(props) {
  //URL params
  const params = useParams();
  // State
  const [level, setLevel] = useState(500);
  const [colorType, setColorType] = useState('hex');

  function updateLevel(newLevel) {
    setLevel(newLevel);
  }

  function updateColorType(colorType) {
    setColorType(colorType);
  }

  // Get Palette
  function findPalette(id) {
    return seedPalettes.find(palette => palette.id === id);
  }

  const seedPalette = findPalette(params.id);
  let renderElements;

  if (seedPalette) {
    const fullPalette = generatePalette(seedPalette);
    const palette = fullPalette.colors[level];
    const colorChips = palette.map(color => (
      <ColorChip key={uuid()} color={color} colorType={colorType} />
    ))

    renderElements = (
      <div className="Palette">
        {/* Palette navbar */}
        <Navbar
          className="Palette-header"
          level={level}
          updateLevel={updateLevel}
          updateColorType={updateColorType}
        />

        {/* Palette color chips */}
        <main className="Palette-colors">
          {colorChips}
        </main>

        {/* Palette footer */}
        <footer className="Palette-footer">
          <h2 className="Palette-footer-name">{fullPalette.paletteName}</h2>
        </footer>
      </div>
    )
  }

  return renderElements || <NotFound />;
}


export default Palette;