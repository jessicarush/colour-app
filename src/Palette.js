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
  // URL params
  const params = useParams();
  const seedPalette = findPalette(params.id);
  // State
  const [level, setLevel] = useState(500);
  const [colorFormat, setColorFormat] = useState('hex');

  let renderElements;

  function updateLevel(newLevel) {
    setLevel(newLevel);
  }

  function updateColorFormat(colorFormat) {
    setColorFormat(colorFormat);
  }

  function findPalette(id) {
    return seedPalettes.find(palette => palette.id === id);
  }

  if (seedPalette) {
    // Get Palette
    const fullPalette = generatePalette(seedPalette);
    const palette = fullPalette.colors[level];
    const colorChips = palette.map(color => (
      <ColorChip key={uuid()} color={color} colorFormat={colorFormat} paletteId={fullPalette.id} />
    ));

    renderElements = (
      <div className="Palette">
        {/* navbar */}
        <Navbar
          className="Palette-navbar"
          level={level}
          updateLevel={updateLevel}
          updateColorFormat={updateColorFormat}
        />

        {/* color chips */}
        <main className="Palette-colors">
          {colorChips}
        </main>

        {/* footer */}
        <footer className="Palette-footer">
          <h2 className="Palette-footer-name">{fullPalette.paletteName}</h2>
        </footer>
      </div>
    )
  }

  return renderElements || <NotFound />;
}


export default Palette;