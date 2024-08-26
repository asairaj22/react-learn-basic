import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../Interceptor/axiosInstance';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import { Trash, Pencil } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import ToastPopup from './common/toast';
import { useLoading } from './common/LoadingContext';
import { useAxiosInterceptors } from '../Interceptor/axiosInstance';

const AxiosAPI = () => {
    return (
        <div>
            <GetCall />
        </div>
    );
};

const GetCall = () => {
    useAxiosInterceptors();
    const [apiData, setApiData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState();
    const [toastBg, setToastBg] = useState();

    // Sample code to update loader value in component
    const { setLoading } = useLoading();

    // Fetch API called twice - Below help to stop calling twice
    const hasFetchedData = useRef(false);

    const showToastWithMessage = (message, bgColor) => {
        setToastBody(message);
        setToastBg(bgColor);
        setShowToast(true);
    };

    const updateJson = async (type, value) => {
        if (type === 'delete') {
            try {
                await axiosInstance.delete(`/posts/${value}`);
                const updatedResponse = apiData?.filter((item) => {
                    return item.id !== value;
                })
                setApiData(updatedResponse);
                showToastWithMessage('Data deleted successfully!', 'success');
            } catch (error) {
                showToastWithMessage(error.toString(), 'danger');
            }
        } else if (type === 'new') {
            setNewPost({ title: '', body: '', userId: '' });
            setShowModal(true);
        } else {
            setNewPost({ title: value.title, body: value.body, userId: value.userId });
            setShowModal(true);
        }
    }

    const addPosts = async (title, body) => {
        try {
            const userId = Math.random().toString(36).slice(2);
            const response = await axiosInstance.post('/posts', { title, body, userId });
            // Shift the new object
            // setApiData([...apiData, response.data]);
            // unshift the new object
            setApiData([response.data, ...apiData]);
            setShowModal(false);
            setNewPost({ title: '', body: '', userId: '' });
            showToastWithMessage('Data added successfully!', 'success');
        } catch (error) {
            showToastWithMessage(error.toString(), 'danger');
        }
    };

    useEffect(() => {
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;

        const fetchData = async () => {
            try {
                const getResponse = await axiosInstance.get('/posts?_limit=10');
                setApiData(getResponse.data);
            } catch (error) {
                setLoading(false);
                showToastWithMessage(error.toString(), 'danger');
            }
        };
        fetchData();
    }, [setLoading]);
    return (
        <div className='m-2'>
            <ToastPopup show={showToast} setShow={setShowToast} body={toastBody} bg={toastBg} />
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
                setNewPost={setNewPost} />
        </div>
    );
};

const ModalPopup = ({ showModal, close, addPosts, newPost, setNewPost }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onBasicFormSubmit = (data) => {
        addPosts(newPost.title, newPost.body);
    };

    return (
        <>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-post-container">
                        <form onSubmit={handleSubmit(onBasicFormSubmit)}>
                            <input 
                                {...register("title", {
                                    required: { value: true, message: "Title is required" },
                                    minLength: { value: 3, message: 'Minimum 3 characters' },
                                })}
                                placeholder='Enter Title'
                                type="text"
                                className="form-control"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            />
                            {errors.title && <span className='error-message'>{errors.title.message}</span>}
                            <div className='mt-2'></div>
                            <textarea
                                {...register("body", {
                                    required: { value: true, message: "Body is required" },
                                    minLength: { value: 7, message: 'Minimum 7 characters' },
                                })}
                                placeholder="Enter Body"
                                className="form-control"
                                cols="10"
                                rows="8"
                                value={newPost.body}
                                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                            />
                            {errors.body && <span className='error-message'>{errors.body.message}</span>}
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-style button-right button-color' onClick={handleSubmit(onBasicFormSubmit)}>Add Post</button>
                    <button className='button-style' onClick={close}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AxiosAPI;