import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function ToastPopup({ show, setShow, body, bg }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        if (show) {
            setTime(new Date());
        }
    }, [show]);

    const readableTime = time.toLocaleTimeString();

    return (
        <Row>
            <Col xs={6}>
                <ToastContainer position="top-end" className="p-3" style={{ zIndex: 10000 }}>
                    <Toast bg={bg} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Alert</strong>
                            <small>{readableTime}</small>
                        </Toast.Header>
                        <Toast.Body className='text-white'>{body}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    );
}

export default ToastPopup;
