import { Route, Routes } from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import ColorShades from './ColorShades';
import NotFound from './NotFound';
import './App.css';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PaletteList />} />
        <Route path="/palette/:id" element={<Palette />} />
        <Route path="/palette/:paletteId/:colorId/*" element={<ColorShades />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
