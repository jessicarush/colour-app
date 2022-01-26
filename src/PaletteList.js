import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import PaletteChip from './PaletteChip';
import './PaletteList.css';


function PaletteList(props) {

  const palettes = props.seedPalettes.map(p => (
    <PaletteChip key={uuid()} palette={p} />
  ));

  return (
    <div className="PaletteList">
      <div className="PaletteList-head">
        <h1 className="PaletteList-header">
          <Link to={"/"}>&lt;Colour Palettes /&gt;</Link>
        </h1>
        <Link to={"/create"} className="PaletteList-new-btn">+ create palette</Link>
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