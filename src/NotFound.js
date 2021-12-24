import { useLocation } from 'react-router-dom';


function NotFound() {
  let location = useLocation();

  return (
    <div className="NotFound">
      <h1 className="">Not Found.</h1>
      <p className="">Nothing exists at { location.pathname }</p>
    </div>
  );
}


export default NotFound