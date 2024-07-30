import React, { useState } from 'react';
import HomePage from './homepage';

const Dashboard = () => {
    const value = { key1: 'Home ', key2: 'Page' };
    const [receivedFromHomePage, setReceivedFromHomePage] = useState('Waiting for button click');
    const handleData = (data) => {
        setReceivedFromHomePage(data);
    };

    return (
        <div className='m-2'>
            <div>
                <h3>Welcome to Dashboard Screen</h3>
                <p>Received data from child: {receivedFromHomePage}</p>
                <HomePage handler={handleData} pageContent={value}></HomePage>
            </div>            
        </div>
    )
}

export default Dashboard;
