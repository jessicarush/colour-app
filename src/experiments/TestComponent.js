import React, { useState } from 'react';
// import React, { Component } from 'react';
import TestPureChild from "./TestPureChild";

function TestComponent() {
  const [children, setChildren] = useState(['A', 'B', 'C', 'D', 'E']);

  const deleteChild = (child) => {
    setChildren(children.filter(c => c !== child));
  };

  return (
    <div className="TestComponent">
      {children.map(c => <TestPureChild key={c} id={c} delete={deleteChild} />)}
    </div>
  );
}

// class TestComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { children: ["A", "B", "C", "D", "E"] };
//     this.deleteChild = this.deleteChild.bind(this);
//   }

//   deleteChild(child) {
//     let newChildren = this.state.children.filter((c) => c !== child);
//     this.setState({ children: newChildren });
//   }

//   render() {
//     return (
//       <div className="TestComponent">
//         {this.state.children.map((c) => (
//           <TestPureChild key={c} id={c} delete={this.deleteChild} />
//         ))}
//       </div>
//     );
//   }
// }

export default TestComponent;
