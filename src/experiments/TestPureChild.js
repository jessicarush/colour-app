// import React, { PureComponent } from "react";
import React from 'react';

function TestPureChild(props) {
  console.log(`Rendered ${props.id}`);

  function handleDelete() {
    props.delete(props.id);
  }

  return (
    <div className="TestPureChild">
      <button onClick={handleDelete}> delete</button> {props.id}
    </div>
  );
}

// class TestPureChild extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.handleDelete = this.handleDelete.bind(this);
//   }

//   handleDelete() {
//     this.props.delete(this.props.id);
//   }

//   render() {
//     console.log(`Rendered ${this.props.id}`);
//     return (
//       <div className="TestPureChild">
//         <button onClick={this.handleDelete}> delete</button> {this.props.id}
//       </div>
//     );
//   }
// }

export default React.memo(TestPureChild);
// export default TestPureChild;