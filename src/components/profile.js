import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onBasicFormSubmit = (data) => {
        alert(JSON.stringify(data));
    }

    return (
        <div className='text-webkit-center'>
            {/* Basic Form */}
            <h3>Form validation with UseForm</h3>
            <form className='mt-4' onSubmit={handleSubmit(onBasicFormSubmit)}>
                <div>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs="4" lg="2" md="3" sm="4">
                                <label className='profile-label'>Enter User Name</label>
                            </Col>
                            <Col xs="12" lg="2" md="3" sm="4">
                                <input className='d-block' defaultValue="test" {...register("userName")} />
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center">
                            <Col xs="4" lg="2" md="3" sm="4">
                                <label className='profile-label'>Enter User ID</label>
                            </Col>
                            <Col xs="12" lg="2" md="3" sm="4">
                                <input className='d-block' {...register("userID", { 
                                    required: {value: true, message: "UserID is required"},
                                    minLength: { value: 7, message: 'Minimum 7 Character'},
                                    pattern: { value: /^[0-9]+$/i, message: 'Enter only numbers'},
                                    validate: (value) => value[0] === '2' || 'Wrong User ID',
                                })} />
                                {errors.userID && <span className='error-message'>{errors.userID.message}</span>}
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center">
                            <Col xs="4" lg="2" md="3" sm="4">
                                <label className='profile-label'>Enter Mobile Number</label>
                            </Col>
                            <Col xs="12" lg="2" md="3" sm="4">
                                <input className='d-block' autoComplete='off' {...register("mobileNumber", {
                                    validate: {
                                    positive: v => parseInt(v) > 0 || 'Number should not be negative',
                                    lessThanTen: v => parseInt(v) >= 10 || 'Number should between 1 - 9',
                                    }
                                })}/>
                                {errors.mobileNumber && <span className='error-message'>{errors.mobileNumber.message}</span>}
                            </Col>
                        </Row>
                    </Container>                    
                </div>
                <div className='mt-3'>
                    <input className='button-style me-2' type="submit" />
                    <Link className='a-style' to="/"> <button className='button-style'> Back to App Screen </button></Link>
                </div>                
            </form>            
        </div>
    )
}

export default Profile;
