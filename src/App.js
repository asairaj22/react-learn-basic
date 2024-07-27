import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import HomePage from './components/homepage';

const App = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };


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
      {/* <h1>Welcome to React</h1>
      <p>Received data from child: {receivedFromHomePage}</p>
      <div>
        <HomePage handler={handleData} pageContent={value}></HomePage>
      </div> */}

      <Routes>
        <Route path="/" />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>


      <Link to="/dashboard">
        <button>
          Link to Dashboard Screen
        </button>
      </Link>

      <button onClick={() => navigate('/dashboard')}>
        Buton click to Dashboard Screen
      </button>

      <button onClick={handleClick}>
        Back to App Screen
      </button>

    </div>
  );
}

export default App;

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
