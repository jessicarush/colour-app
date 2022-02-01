import './css/Page.css';

// This component is used as a helper for page transitions
// using TransitionGroup and CSSTransition from react-transition-group
// It should wrap any top-level route component.

function Page(props) {
  return (
    <div className="Page">
       {props.children}
    </div>
  );
}

export default Page;