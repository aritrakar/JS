import React from 'react';
import Header from "./Header.js"
import MemeGenerator from "./MemeGenerator.js"

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MemeGenerator />
      </div>
    );
  }
}

export default App;
