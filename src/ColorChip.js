import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColorChip.css';


function ColorChip(props) {
  // State values
  const [copied, setCopied] = useState(false);

  function updateCopied() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const color = props.color[props.colorType];
  const name = props.color.name;

  return (
    <CopyToClipboard text={ color } onCopy={ updateCopied }>
      <div className="ColorChip" style={{ background: color }}>

        <div className={ `copy-overlay ${copied ? "show" : ""}` }
             style={{ background: color }}>
          <div className={`copy-msg ${copied ? "show" : ""}`}>
            <p>Copied { color.toLowerCase() }</p>
          </div>
        </div>

        <div className="copy-container">
          <button className="copy-btn">Copy</button>
        </div>

        <div className="info-container">
          <h2 className="info-name">{ name }</h2>
          <button className="info-more">More</button>
        </div>

      </div>
    </CopyToClipboard>
  );
}


export default ColorChip;
