// import React from 'react';
// import HomePage from './Components/homepage';

// class App extends React.Component {
//   value = {
//     key1: 'Home ',
//     key2: 'Page'
//   };

//   state = {
//     receivedFromHomePage: 'Waiting for button click'
//   }

//   handleData = (data) => {
//     this.setState({ receivedFromHomePage: data });
//   };

//   render() {  
//     return (
//       <div className="App">
//         <h1>Welcome to React</h1>
//         <p>Received data from child: {this.state.receivedFromHomePage}</p>
//         <div>
//           <HomePage handler={this.handleData} pageContent={this.value}></HomePage>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState } from 'react';
import HomePage from './Components/homepage';

const App = () => {
  const value = {
    key1: 'Home ',
    key2: 'Page'
  };

  const [receivedFromHomePage, setReceivedFromHomePage] = useState('Waiting for button click');

  const handleData = (data) => {
    setReceivedFromHomePage(data);
  };

  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <p>Received data from child: {receivedFromHomePage}</p>
      <div>
        <HomePage handler={handleData} pageContent={value}></HomePage>
      </div>
    </div>
  );
}

export default App;
