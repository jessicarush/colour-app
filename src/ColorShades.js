import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ColorChip from './ColorChip';
import Navbar from './Navbar';
import generatePalette from './helpers';
import './ColorShades.css';
import NotFound from './NotFound';

// Opportunity for improvement: color format should be stored in localStorage

function ColorShades(props) {
  const seedPalettes = props.seedPalettes;
  // URL params
  const params = useParams();
  const format = ['hex', 'rgb', 'rgba'].includes(params.format) ? params.format : 'hex';
  const paletteId = params.paletteId;
  const colorId = params.colorId;
  // State
  const [colorFormat, setColorFormat] = useState(format);

  let renderElements;
  let paletteName;
  const colorShades = findColorShades(colorId, paletteId);

  function updateColorFormat(colorFormat) {
    setColorFormat(colorFormat);
  }

  function findPalette(id) {
    return seedPalettes.find(palette => palette.id === id);
  }

  function findColorShades(colorId, paletteId) {
    let shades;
    // Get Palette
    const seedPalette = findPalette(paletteId);
    if (seedPalette) {
      shades = [];
      paletteName = seedPalette.paletteName;
      const fullPalette = generatePalette(seedPalette);
      // Get color shades
      for (let level in fullPalette.colors) {
        shades = shades.concat(
          fullPalette.colors[level].filter(c => c.id === colorId)
        );
      }
    }
    return shades;
  }

  if (colorShades) {
    const colorName = colorShades[0].name.replace(/ [0-9]+$/, '');
    const colorChips = colorShades.map(color => (
      <ColorChip key={uuid()} color={color} colorFormat={colorFormat} />
    ));

    renderElements = (
      <div className="ColorShades">
        {/* navbar */}
        <Navbar
          colorFormat={colorFormat}
          className="ColorShades-navbar"
          updateColorFormat={updateColorFormat}
        />

        {/*  color chips */}
        <main className="ColorShades-colors">
          {colorChips}
        </main>

        {/* footer */}
        <footer className="ColorShades-footer">
          <h2 className="ColorShades-footer-name">
            {colorName}<span className="ColorShades-footer-light"> / </span>
            <Link to={`/palette/${paletteId}`}>{paletteName}</Link>
          </h2>
        </footer>
      </div>
    )
  }

  return renderElements || <NotFound />;
}


export default ColorShades;