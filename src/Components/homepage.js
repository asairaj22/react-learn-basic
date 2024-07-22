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

import React from 'react';

const HomePage = (props) => {    
    const sendData = () => {
        props.handler('Data from Homepage');
    }

    console.log(props.pageContent);

    return (
        <div>
            <h2>My Simple React {props.pageContent.key1 + props.pageContent.key2}</h2>
            <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
            <img src="https://via.placeholder.com/300" alt="Placeholder" />
            <button onClick={sendData}>Send Data</button>
        </div>
    )
}

export default HomePage;
