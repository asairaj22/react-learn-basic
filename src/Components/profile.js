import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import HomePage from './homepage';
import { useForm } from "react-hook-form"

const Profile = (props) => {
    // const value = { key1: 'Home ', key2: 'Page' };
    // const [receivedFromHomePage, setReceivedFromHomePage] = useState('Waiting for button click');
    // const handleData = (data) => {
    //     setReceivedFromHomePage(data);
    // };

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onBasicFormSubmit = (data) => console.log(data)

    return (
        <div>
            {/* Basic Form */}
            <form onSubmit={handleSubmit(onBasicFormSubmit)}>
                <input defaultValue="test" {...register("userName")} />
                <input {...register("userID", { 
                    required: {value: true, message: "UserID is required"},
                    minLength: { value: 7, message: 'Minimum 7 Character'},
                    pattern: { value: /^[0-9]+$/i, message: 'Enter only numbers'},
                    validate: (value) => value[0] == '2' || 'Wrong User ID',
                })} />
                {errors.userID && <span>{errors.userID.message}</span>}
                <input
                {...register("mobileNumber", {
                    validate: {
                    positive: v => parseInt(v) > 0 || 'Number should not be negative',
                    lessThanTen: v => parseInt(v) >= 10 || 'Number should between 1 - 9',
                    }
                })}/>
                {errors.mobileNumber && <span>{errors.mobileNumber.message}</span>}
                <input type="submit" />
            </form>

            {/* <div>
                <h1>Welcome to Profile Screen</h1>
                <p>Received data from child: {receivedFromHomePage}</p>
                <HomePage handler={handleData} pageContent={value}></HomePage>
            </div> */}
            <Link to="/"> <button> Back to App Screen </button></Link>
        </div>
    )
}

export default Profile;
