import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import './css/NotFound.css';


function NotFound() {
  let location = useLocation();

  return (
    <div className="page-transition-helper">

    <div className="NotFound">
      <header>
        <h1 className="PaletteList-header">
          <Link to={"/"}>&lt;Colour Palettes /&gt;</Link>
        </h1>
      </header>
      <main>
        <h2 className="NotFound-colorful">
          <span className="a">N</span>
          <span className="b">o</span>
          <span className="c">t </span>
          <span className="d">F</span>
          <span className="e">o</span>
          <span className="f">u</span>
          <span className="g">n</span>
          <span className="h">d</span>
          .
        </h2>
        <p className="">Nothing exists at <strong>{location.pathname}</strong></p>
      </main>
      <Footer />
    </div>

    </div>
  );
}


export default NotFound