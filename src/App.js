import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import PaletteList from './PaletteList';
import Palette from './Palette';
import ColorShades from './ColorShades';
import CreatePalette from './CreatePalette';
import NotFound from './NotFound';
import SortableTest from './SortableTest';
import './App.css';


function App() {
  const [palettes, setPalettes] = useState(seedPalettes);

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
  }

  return (
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
        <Route path="/testing" element={<SortableTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
