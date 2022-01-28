import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import seedPalettes from './seedPalettes';
import PaletteList from './PaletteList';
import Palette from './Palette';
import ColorShades from './ColorShades';
import CreatePalette from './CreatePalette';
import NotFound from './NotFound';
import './css/App.css';


function App() {
  // First check if there is any data in localStorage
  const storedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(storedPalettes || seedPalettes);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  // Save palettes to localStorage whenever palettes is changed
  useEffect(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
 }, [palettes]);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Routes>
          <Route path="/" element={<PaletteList seedPalettes={palettes} />} />
          <Route path="/palette/:id" element={<Palette seedPalettes={palettes} />} />
          <Route path="/palette/:paletteId/:colorId">
            {/* Optional URL param for color format */}
            <Route path=":format" element={<ColorShades seedPalettes={palettes} />} />
            <Route path="" element={<ColorShades seedPalettes={palettes} />} />
          </Route>
          <Route path="/create" element={
            <CreatePalette savePalette={savePalette} seedPalettes={palettes} />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
