import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './ColorChip.css';


function ColorChip(props) {
  // State values
  const [copied, setCopied] = useState(false);

  const paletteId = props.paletteId;
  const colorId = props.color.id;
  const color = props.color[props.colorFormat];
  const name = props.color.name;

  function updateCopied() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function analyzeContrast(foregroundColor, backgroundColor) {
    // Computes the WCAG contrast ratio between two colors.
    // A minimum contrast of 4.5 is recommended to ensure that text is still
    // readable against a background color.
    const contrast = chroma.contrast(foregroundColor, backgroundColor);
    return contrast >= 2.25;
  }

  const goodContrast = analyzeContrast("fff", color);
  const fontColor = goodContrast ? '#fff' : chroma(color).darken(3);
  const btnBgColor = goodContrast ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.35)';

  return (
    <CopyToClipboard text={color} onCopy={updateCopied}>
      <div className="ColorChip" style={{ background: color }}>

        <div
          className={`copy-overlay ${copied ? "show" : ""}`}
          style={{ background: color }}
        >
          <div
            className={`copy-msg ${copied ? "show" : ""}`}
            style={{ color: fontColor }}
          >
            <p>Copied {color.toLowerCase()}</p>
          </div>
        </div>

        <div className="copy-container">
          <button
            className="copy-btn"
            style={{ color: fontColor, background: btnBgColor }}
          >
            Copy
          </button>
        </div>

        <div className="info-container">
          <h2 className="info-name" style={{ color: fontColor }}>
            {name}
          </h2>

          {/* The more button is only rendered in Palette.js */}
          {paletteId && (
            <Link
              to={`/palette/${paletteId}/${colorId}/${props.colorFormat}`}
              className="info-more"
              style={{ color: fontColor, background: btnBgColor }}
              onClick={e => { e.stopPropagation() }}
            >
              &hellip;More
            </Link>
          )}
        </div>

      </div>
    </CopyToClipboard>
  );
}


export default ColorChip;
