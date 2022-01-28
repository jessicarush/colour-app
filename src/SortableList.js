import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortableChip from './SortableChip';
import './css/SortableList.css';

// function SortableList(props) {
//   const {colors, deleteColor } = props;
//   return (
//     <div className="CreatePalette-chips">
//       {colors.map(color => (
//         <SortableChip
//           key={color.value}
//           color={color.value}
//           name={color.name}
//           deleteColor={deleteColor}
//         />
//       ))}
//     </div>
//   )
// }


const SortableList = SortableContainer((props) => {
  const {colors, deleteColor } = props;
  return (
    <div className="SortableList">
      {colors.map((color, i) => (
        <SortableChip
          index={i}
          key={color.value}
          color={color.value}
          name={color.name}
          deleteColor={deleteColor}
        />
      ))}
    </div>
  );
});

export default SortableList;