import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LoadingProvider } from './components/common/LoadingContext';
import Loader from './components/common/loader';
import { ToastProvider } from './components/common/ToastContext';

const App = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const isLoggedIn = sessionStorage.getItem('isAuthenticated');

  return (
    <LoadingProvider>
      <Loader />
      <ToastProvider>
        <div className="App">        
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/home">React</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <NavDropdown title="Directive" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/structural-directive">
                    Structural
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/attribute-directive">
                  Attribute
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/axiosApi">API(S)</Nav.Link>
                <Nav.Link as={Link} to="/lazyComponent">Lazy</Nav.Link>
                <NavDropdown title="lifeCycle" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/useReducer">Use Reducer</NavDropdown.Item>
                </NavDropdown>
              </Nav> 
              {isLoggedIn && (
                <Nav className="ms-auto">
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              )}         
            </Container>
          </Navbar>
          <AppRoutes />      
        </div>
      </ToastProvider>
    </LoadingProvider> 
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