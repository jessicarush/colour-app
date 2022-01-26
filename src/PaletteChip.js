import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import './PaletteChip.css';


function PaletteChip(props) {
  const { palette } = props;
  const navigate = useNavigate();

  const gotoPalette = () => {
    navigate(`/palette/${palette.id}`);
  };

  const colors = palette.colors.map(c => (
    <div
      key={uuid()}
      className="PaletteChip-color"
      style={{ background: c.value }}
    >
    </div>
  ));

  return (
    <div className="PaletteChip" onClick={gotoPalette}>
      <div className="PaletteChip-colors">
        {colors}
      </div>
      <h2 className="PaletteChip-name">{palette.paletteName}</h2>
    </div>
  );
}


export default PaletteChip;