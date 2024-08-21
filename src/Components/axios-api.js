import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../Interceptor/axiosInstance';
import Table from 'react-bootstrap/Table';
import { Trash, Pencil } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import ToastPopup from './common/toast';
import LoadingSpinner from './common/spinner';

const AxiosAPI = () => {
    return (
        <div>
            <GetCall />
        </div>
    );
};

const GetCall = () => {
    const [apiData, setApiData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState();
    const [toastBg, setToastBg] = useState();

    const [loading, setLoading] = useState(false);

    const showToastWithMessage = (message, bgColor) => {
        setToastBody(message);
        setToastBg(bgColor);
        setShowToast(true);
    };

    const updateJson = async (type, value) => {
        if (type === 'delete') {
            try {
                setLoading(true);
                await axios.delete(`https://jsonplaceholder.typicode.com/posts/${value}`);
                const updatedResponse = apiData?.filter((item) => {
                    return item.id !== value;
                })
                setApiData(updatedResponse);
                setLoading(false);
                showToastWithMessage('Data deleted successfully!', 'success');
            } catch (error) {
                setLoading(false);
                showToastWithMessage(error.toString(), 'danger');
            }
        } else if(type === 'new') {
            setNewPost({ title: '', body: '', userId: ''});
            setShowModal(true);
        } else {
            setNewPost({ title: value.title, body: value.body, userId: value.userId});
            setShowModal(true);
        }
    }

    const addPosts = async (title, body) => {
        try {
            setLoading(true);
            const userId = Math.random().toString(36).slice(2);
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { title, body, userId });
            setApiData([...apiData, response.data]);
            setShowModal(false);
            setNewPost({ title: '', body: '', userId: ''});
            setLoading(false);
            showToastWithMessage('Data added successfully!', 'success');
        } catch (error) {
            setLoading(false);
            showToastWithMessage(error.toString(), 'danger');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const getResponse = await axiosInstance.get('/posts?_limit=10');
                setApiData(getResponse.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                showToastWithMessage(error.toString(), 'danger');
            }
        };
        fetchData();
    }, []);
    return (
        <div className='m-2'>
            <ToastPopup show={showToast} setShow={setShowToast} body={toastBody} bg={toastBg} />
            <LoadingSpinner loading={loading} />
            <div className='mt-2 mb-3'>
                <h4 className='container-inline'>API Data Display</h4>
                <button className='button-style button-right button-color mt-1' onClick={() => updateJson('new', '')}>Add New Data</button>
            </div>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apiData?.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.id}</td>
                                    <td>{element.title}</td>
                                    <td>{element.body}</td>
                                    <td><Pencil color="blue" size={15} onClick={() => updateJson('edit', element)} /></td>
                                    <td><Trash color="red" size={15} onClick={() => updateJson('delete', element.id)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <ModalPopup 
                showModal={showModal} 
                close={() => setShowModal(false)} 
                addPosts={addPosts}
                newPost={newPost}
                setNewPost={setNewPost}
            />

            
            
            {/* <ModalPopup showModal={showModal.isPopup} close={() => setShowModal(false)}></ModalPopup> */}

            {/* {apiData ? (
                // Render your component using the fetched data
                <p>{apiData[0].id}</p>
            ) : (
                // Render a loading state or placeholder
                <p>Loading...</p>
            )} */}
        </div>
    );
};

const ModalPopup = ({ showModal, close, addPosts, newPost, setNewPost }) => {
    const handleSubmit = (e) => {
        addPosts(newPost.title, newPost.body);
    };

    return (
        <>
            <Modal show={showModal}>
            {/* onClick={props.close} */}
                <Modal.Header>
                {/* closeButton */}
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-post-container">
                        <form>
                            <input 
                                placeholder='Enter Title' 
                                type="text" 
                                className="form-control" 
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            />
                            <div className='mt-2'></div>
                            <textarea 
                                placeholder="Enter Body" 
                                className="form-control" 
                                cols="10" 
                                rows="8"
                                value={newPost.body} 
                                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                            />
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-style button-right button-color' onClick={() => handleSubmit()}>Add Post</button>
                    <button className='button-style' onClick={close}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AxiosAPI;