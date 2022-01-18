import React, { useState } from "react";
import './DraggableChip.css';


function DraggableChip(props) {

  return (
    <div className="DraggableChip" style={{background: props.color}}>
      { props.color }
    </div>
  )
}

export default DraggableChip;