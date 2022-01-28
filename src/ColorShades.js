import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import ColorChip from './ColorChip';
import Navbar from './Navbar';
import NotFound from './NotFound';
import generatePalette, { toKebabCase } from './helpers';
import './css/ColorShades.css';


// Opportunity for improvement: color format should be stored in localStorage

function ColorShades(props) {
  // props
  const { seedPalettes } = props;
  // url params
  const params = useParams();
  const format = ['hex', 'rgb', 'rgba'].includes(params.format) ? params.format : 'hex';
  const paletteId = params.paletteId;
  const colorId = params.colorId;
  // state
  const [colorFormat, setColorFormat] = useState(format);

  const [colorName, paletteName, colorShades] = getColorShades(colorId, paletteId);

  const updateColorFormat = (colorFormat) => {
    setColorFormat(colorFormat);
  };

  function findPalette(id) {
    return seedPalettes.find(palette => palette.id === id);
  }

  function findColor(colorId, seedPalette) {
    return seedPalette.colors.find(c => toKebabCase(c.name) === colorId);
  }

  function getColorShades(colorId, paletteId) {
    let colorName, paletteName, shades;
    // Get Palette (check if palette exists)
    const seedPalette = findPalette(paletteId);

    if (seedPalette) {
      // Get color shades (check if color exists)
      const seedColor = findColor(colorId, seedPalette);

      if (seedColor) {
        colorName = seedColor.name;
        paletteName = seedPalette.paletteName;
        shades = [];
        const fullPalette = generatePalette(seedPalette);

        for (let level in fullPalette.colors) {
          shades = shades.concat(
            fullPalette.colors[level].filter(c => c.id === colorId)
          );
        }
      }
    }
    return [colorName, paletteName, shades];
  }

  let renderElements;

  if (colorShades) {
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