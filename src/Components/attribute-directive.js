import React, { useState } from 'react';
import useNgStyle from './custom-hooks';

const AttributeDirective = () => {
    const [value, setValue] = useState(true);
    const toogleValue = () => {
        const updatedValue = !value;
        setValue(updatedValue);
        setStyle('color', updatedValue ? 'red' : 'blue');
    };
    // Below comment out code will not proper. 
    // Due to the asynchronous nature of the useState hook in React. 
    // setValue(!value), the state update isn’t applied immediately. Instead, it’s scheduled to happen in the next render
    // const toogleValue = () => {
    //     setValue(!value);
    //     setStyle('color', value ? 'red' : 'blue');
    // };
    const [styles, setStyle] = useNgStyle({color: 'red'});

    return (
        <div className='m-2'>
            <div>
                <p className='font-weight-bold'>ngClass</p>
                <div className={`color-default ${value ? 'color-red' : ''}`}>
                    Default black, True - Red
                </div>
                <div className={`${value ? 'color-red' : 'color-blue'}`}>
                    True - Red, False - Blue
                </div>
                <hr></hr>
            </div>
            <div>
                <p className='font-weight-bold'>ngStyle</p>
                <div style={{color: value ? 'red' : ''}}>
                    Default black, True - Red
                </div>
                <div style={{color: value ? 'red' : 'blue'}}>
                    True - Red, False - Blue
                </div>
                <hr></hr>
                <div style={styles}>Custom Hook</div>
            </div>
            <button className='button-style' onClick={toogleValue}>Toogle</button>
        </div>
    )
}

export default AttributeDirective;
