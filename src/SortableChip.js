import React from "react";
import chroma from 'chroma-js';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from "react-sortable-hoc";

import { analyzeContrast } from './helpers';
import './SortableChip.css';


// function SortableChip(props) {
//   const { color, name, deleteColor } = props;

//   const goodContrast = analyzeContrast("fff", color);
//   const fontColor = goodContrast ? '#fff' : chroma(color).darken(3);

//   function handleDeleteColor() {
//     deleteColor(color);
//   }
//   return (

//     <div className="SortableChip" style={{ background: color }}>
//       <div className="info-container">
//         <h2 className="info-name" style={{ color: fontColor }} title={color}>
//           {name}
//         </h2>
//         <button
//           className="trash-icon-btn"
//           title="Delete color"
//           onClick={handleDeleteColor}
//         >
//           <DeleteIcon style={{ color: fontColor }} />
//         </button>
//       </div>
//     </div>
//   )
// }

const SortableChip = SortableElement((props) => {
  const { color, name, deleteColor } = props;

  const goodContrast = analyzeContrast("fff", color);
  const fontColor = goodContrast ? '#fff' : chroma(color).darken(3);

  function handleDeleteColor() {
    deleteColor(color);
  }
  return (
    <div className="SortableChip" style={{ background: color }}>
      <div className="info-container">
        <h2 className="info-name" style={{ color: fontColor }} title={color}>
          {name}
        </h2>
        <button
          className="trash-icon-btn"
          title="Delete color"
          onClick={handleDeleteColor}
        >
          <DeleteIcon style={{ color: fontColor }} />
        </button>
      </div>
    </div>
  )
});

export default SortableChip;