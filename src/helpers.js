import chroma from 'chroma-js';


const levels = [100, 200, 300, 400, 500, 600, 700, 800, 900];

function getColorRange(hexColor) {
  // Returns an array of [darker color, color, white]
  const startColor = chroma(hexColor).darken(1.5).hex();
  // const endColor = "#fff";
  const endColor = chroma(hexColor).brighten(1.5).hex();
  return [startColor, hexColor, endColor];
}

function generateColorScale(hexColor, numColors) {
  // Returns an array of hex colors
  return chroma.scale(getColorRange(hexColor)).mode('lab').colors(numColors);
}

function generatePalette(seedPalette) {
  let newPalette = {
    paletteName: seedPalette.paletteName,
    id: seedPalette.id,
    colors: {}
  };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  for (let color of seedPalette.colors) {
    let scale = generateColorScale(color.value, levels.length).reverse();
    for (let [idx, hexValue] of scale.entries()) {
      let level = levels[idx];
      let newColor = {
        name: `${color.name} ${level}`,
        // id: ?,
        hex: hexValue,
        rgb: chroma(hexValue).css(),
        rgba: chroma(hexValue).css().replace('rgb', 'rgba').replace(')', ',1)')
      };
      newPalette.colors[level].push(newColor);
    }
  }
  return newPalette;
}


export default generatePalette;
