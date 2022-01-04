import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ColorChip from './ColorChip';
// import Navbar from './Navbar';
import seedPalettes from './seedPalettes';
import generatePalette from './helpers';
// import './ColorShades.css';
import NotFound from './NotFound';


function ColorShades(props) {
  // State
  const [colorType, setColorType] = useState('hex');
  // URL params
  const params = useParams();
  const paletteId = params.paletteId;
  const colorId = params.colorId;

  const colorShades = findColorShades(colorId, paletteId);
  let renderElements;

  function findPalette(id) {
    return seedPalettes.find(palette => palette.id === id);
  }

  function findColorShades(colorId, paletteId) {
    let colorShades;
    // Get Palette
    const seedPalette = findPalette(paletteId);
    if (seedPalette) {
      const fullPalette = generatePalette(seedPalette);
      // Get color shades
      const colorIndex = fullPalette.colors[100].findIndex(c => c.id === colorId);
      // findIndex returns -1 if item not found
      if (colorIndex > -1) {
        colorShades = [];
        for (let level in fullPalette.colors) {
          colorShades.push(fullPalette.colors[level][colorIndex]);
        }
      }
    }
    return colorShades;
  }

  if (colorShades) {
    const colorChips = colorShades.map(color => (
      <ColorChip key={uuid()} color={color} colorType={colorType} />
    ));

    renderElements = (
      <div className="ColorShades">
        {/* Color shades navbar */}

        {/*  Color shades chips */}
        <main className="ColorShades-colors">
          {colorChips}
        </main>

        {/* Color shades footer */}
        <footer className="ColorShades-footer">
          <h2 className="ColorShades-footer-name">
            {paletteId}
            {colorId}
          </h2>
        </footer>
      </div>
    )
  }

  return renderElements || <NotFound />;
}


export default ColorShades;