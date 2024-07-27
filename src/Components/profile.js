import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomePage from './homepage';

const Profile = (props) => {
    const value = { key1: 'Home ', key2: 'Page' };
    const [receivedFromHomePage, setReceivedFromHomePage] = useState('Waiting for button click');
    const handleData = (data) => {
        setReceivedFromHomePage(data);
    };

    return (
        <div>
            <h1>Welcome to Profile Screen</h1>
            <p>Received data from child: {receivedFromHomePage}</p>
            <div>
                <HomePage handler={handleData} pageContent={value}></HomePage>
            </div>


            <Link to="/"> <button> Back to App Screen </button></Link>
        </div>
    )
}

export default Profile;
