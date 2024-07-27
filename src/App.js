import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>          
        </Container>
      </Navbar>
      <AppRoutes />      
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
