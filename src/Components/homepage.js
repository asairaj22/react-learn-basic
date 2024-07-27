import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    
    const sendData = () => {
        props.handler('Data from Homepage');
    }

    console.log(props.pageContent);

    return (
        <div>
            <h2>My Simple React {props.pageContent?.key1 + props.pageContent?.key2}</h2>
            <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
            <img src="https://via.placeholder.com/300" alt="Placeholder" />
            <button onClick={sendData}>Send Data</button>

            <div>
            <button onClick={() => navigate('/profile')}>
                Buton click to Profile Screen
            </button>

            <button onClick={handleClick}>
                Back to App Screen
            </button>
            </div>
        </div>
    )
}

export default HomePage;

// import React from 'react';

// class HomePage extends React.Component {    
//         sendData = () => {
//             this.props.handler('Data from Homepage');
//         }
//     render() {
//         console.log(this.props.pageContent);
//         return (
//             <div>
//                 <h2>My Simple React {this.props.pageContent.key1 + this.props.pageContent.key2}</h2>
//                 <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
//                 <img src="https://via.placeholder.com/300" alt="Placeholder" />
//                 <button onClick={this.sendData}>Send Data</button>
//             </div>
//         )
//     }
// }

// export default HomePage;
