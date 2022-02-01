import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import seedPalettes from "./seedPalettes";
import Page from "./Page";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import ColorShades from "./ColorShades";
import CreatePalette from "./CreatePalette";
import NotFound from "./NotFound";
import "./css/App.css";

function App() {
  // First check if there is any data in localStorage
  const storedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(storedPalettes || seedPalettes);

  const location = useLocation();

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (paletteToDelete) => {
    // Fade out the palette first by applying a class
    document.getElementById(paletteToDelete.id).style.opacity = 0;
    // The timeout delay should match the transition duration in PaletteChip.css
    setTimeout(() => {
      const remainingPalettes = palettes.filter(
        (p) => p.id !== paletteToDelete.id
      );
      setPalettes(remainingPalettes);
    }, 600);
  };

  // Save palettes to localStorage whenever palettes is changed
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={400}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <Page>
                    <PaletteList
                      deletePalette={deletePalette}
                      seedPalettes={palettes}
                    />
                  </Page>
                }
              />
              <Route
                path="/palette/:id"
                element={
                  <Page>
                    <Palette seedPalettes={palettes} />
                  </Page>
                }
              />
              <Route path="/palette/:paletteId/:colorId">
                {/* Optional URL param for color format */}
                <Route
                  path=":format"
                  element={
                    <Page>
                      <ColorShades seedPalettes={palettes} />
                    </Page>
                  }
                />
                <Route
                  path=""
                  element={
                    <Page>
                      <ColorShades seedPalettes={palettes} />
                    </Page>
                  }
                />
              </Route>
              <Route
                path="/create"
                element={
                  <Page>
                    <CreatePalette
                      savePalette={savePalette}
                      seedPalettes={palettes}
                    />
                  </Page>
                }
              />
              <Route path="*" element={<Page><NotFound /></Page>}/>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
