import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"

const Profile = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();    
    const onBasicFormSubmit = (data) => console.log(data);

    return (
        <div>
            {/* Basic Form */}
            <form className='mt-4 text-webkit-center' onSubmit={handleSubmit(onBasicFormSubmit)}>
                <input className='d-block' defaultValue="test" {...register("userName")} />
                <input className='d-block' {...register("userID", { 
                    required: {value: true, message: "UserID is required"},
                    minLength: { value: 7, message: 'Minimum 7 Character'},
                    pattern: { value: /^[0-9]+$/i, message: 'Enter only numbers'},
                    validate: (value) => value[0] === '2' || 'Wrong User ID',
                })} />
                {errors.userID && <span className='error-message'>{errors.userID.message}</span>}
                <input className='d-block' autoComplete='off' {...register("mobileNumber", {
                    validate: {
                    positive: v => parseInt(v) > 0 || 'Number should not be negative',
                    lessThanTen: v => parseInt(v) >= 10 || 'Number should between 1 - 9',
                    }
                })}/>
                {errors.mobileNumber && <span className='error-message'>{errors.mobileNumber.message}</span>}
                <div className='mt-3'>
                    <input className='button-style me-2' type="submit" />
                    <Link className='a-style' to="/"> <button className='button-style'> Back to App Screen </button></Link>
                </div>                
            </form>            
        </div>
    )
}

export default Profile;
