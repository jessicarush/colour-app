import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

import { analyzeContrast } from './helpers';
import './css/ColorChip.css';


function ColorChip(props) {
  // props
  const paletteId = props.paletteId;
  const colorFormat = props.colorFormat;
  const colorId = props.color.id;
  const name = props.color.name;
  const color = props.color[colorFormat];
  // state
  const [copied, setCopied] = useState(false);

  const goodContrast = analyzeContrast("fff", color);
  const fontColor = goodContrast ? '#fff' : chroma(color).darken(3);
  const btnBgColor = goodContrast ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.35)';

  const updateCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <CopyToClipboard text={color} onCopy={updateCopied}>
      <div className={"ColorChip"} style={{ background: color }}>

        <div
          className={`ColorChip-copy-container ${copied && "transform"}`}
          style={{ background: color }}
        >
          <button
            className="ColorChip-copy-btn"
            style={{ color: fontColor, background: btnBgColor }}
          >
            Copy
          </button>
          <div
            className={`ColorChip-copy-msg ${copied ? "show" : ""}`}
            style={{ color: fontColor, background: color }}
          >
            <p>Copied {color.toLowerCase()}</p>
          </div>
        </div>

        <div className="ColorChip-info-container">
          <h2 className="ColorChip-info-name truncate" style={{ color: fontColor }}>
            {name}
          </h2>

          {/* The more button is only rendered in Palette.js */}
          {paletteId && (
            <Link
              to={`/palette/${paletteId}/${colorId}/${colorFormat}`}
              className="ColorChip-info-more"
              style={{ color: fontColor}}
              onClick={e => { e.stopPropagation() }}
            >
              More +
            </Link>
          )}
        </div>

      </div>
    </CopyToClipboard>
  );
}


export default ColorChip;
