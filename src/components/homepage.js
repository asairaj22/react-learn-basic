import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
    const h3Ref = useRef();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    const sendData = () => {
        if (typeof props.handler === 'function') {
            props.handler('Data from Homepage');
        } else {
            h3Ref.current.innerText = h3Ref.current.innerText + ' - useRef Implemented';
        }
    }
    console.log(props.pageContent);

    return (
        <div className='m-2'>
            <h3 ref={h3Ref}>My Simple React {props.pageContent?.key1} {props.pageContent?.key2}</h3>
            <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
            <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Placeholder" width={150} />
            <div className='mt-2'>
                <button className='button-style' onClick={sendData}>Send Data</button>
                <button className='button-style ms-2' onClick={() => navigate('/profile')}>
                    Buton click to Profile Screen
                </button>

                <button className='button-style ms-2' onClick={handleClick}>
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
