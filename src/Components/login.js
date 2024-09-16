// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const submit = async () => {
//     sessionStorage.setItem('isAuthenticated', true);
//     navigate("/home");
//   };

//   return (
//     <>
//       <h1>Login</h1>
//       <form onSubmit={submit}>
//         <label htmlFor="username">username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//         />
//         <label htmlFor="password">password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />
//         <button type="submit">login</button>
//       </form>
//     </>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login() {
    const navigate = useNavigate();
  
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onBasicFormSubmit = (data) => {
        sessionStorage.setItem('isAuthenticated', true);
        navigate("/home");
    }

    return (
        <div className='m-3 text-webkit-center'>
            {/* Basic Form */}
            <h3>Application Login</h3>
            <form className='mt-4' onSubmit={handleSubmit(onBasicFormSubmit)}>
                <div>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs="4" lg="2" md="3" sm="4">
                                <label className='profile-label'>Enter User Name</label>
                            </Col>
                            <Col xs="12" lg="2" md="3" sm="4">
                                <input className='d-block' {...register("userName", {
                                    required: {value: true, message: "User Name is required"},
                                })} />
                                {errors.userName && <span className='error-message'>{errors.userName.message}</span>}
                            </Col>
                        </Row>

                        <Row className="mt-2 justify-content-md-center">
                            <Col xs="4" lg="2" md="3" sm="4">
                                <label className='profile-label'>Enter Password</label>
                            </Col>
                            <Col xs="12" lg="2" md="3" sm="4">
                                <input className='d-block' {...register("password", { 
                                    required: {value: true, message: "Password is required"},
                                    minLength: { value: 3, message: 'Minimum 3 Character'},
                                })} />
                                {errors.password && <span className='error-message'>{errors.password.message}</span>}
                            </Col>
                        </Row>                      
                    </Container>                    
                </div>
                <div className='mt-3'>
                    <input className='button-style me-2' type="submit" />
                </div>                
            </form>            
        </div>
    )
}

