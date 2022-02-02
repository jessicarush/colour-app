import { Link } from 'react-router-dom';

import PaletteChip from './PaletteChip';
import Footer from './Footer';
import './css/PaletteList.css';


function PaletteList(props) {
  const { deletePalette } = props;

  const palettes = props.seedPalettes.map(p => (
    <PaletteChip key={p.id} palette={p} deletePalette={deletePalette} />
  ));

  return (
    <div className="PaletteList">
      <div className="PaletteList-head">
        <h1 className="PaletteList-header">
          <Link to={"/"}>&lt;Colour Palettes /&gt;</Link>
        </h1>
        <Link to={"/create"} className="PaletteList-new-btn">+ create<span> palette</span></Link>
      </div>
      <div className="PaletteList-palettes">
        {/* Palettes go here */}
        {palettes}
      </div>
      <div className="PaletteList-footer">
        <Footer />
      </div>
    </div>
  );
}


export default PaletteList;