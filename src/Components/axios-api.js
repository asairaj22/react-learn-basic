import React, { useState, useEffect, useRef } from 'react';
import axiosInterceptor from '../Interceptor/axiosInterceptor';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import { Trash, Pencil } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import { useToast } from './common/ToastContext';
import { useLoading } from './common/LoadingContext';
import { useAxiosInterceptors } from '../Interceptor/axiosInterceptor';

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

    // Code to update Loader/Toast value in component
    const { setLoading } = useLoading();
    const showToast = useToast();

    // Fetch API called twice - Below help to stop calling twice
    const hasFetchedData = useRef(false);

    const updateJson = async (type, value) => {
        if (type === 'delete') {
            try {
                await axiosInterceptor.delete(`/posts/${value}`);
                const updatedResponse = apiData?.filter((item) => {
                    return item.id !== value;
                })
                setApiData(updatedResponse);
                showToast('Data deleted successfully!', 'success');
            } catch (error) {
                console.log(error);
            }
        } else if (type === 'new') {
            setNewPost({ title: '', body: '', userId: '', id: '' });
            setShowModal(true);
        } else {
            setNewPost({ title: value.title, body: value.body, userId: value.userId, id: value.id });
            setShowModal(true);
        }
    }

    const addPosts = async (title, body) => {
        try {
            const userId = Math.random().toString(36).slice(2);
            const response = await axiosInterceptor.post('/posts', { title, body, userId });
            // Shift the new object
            // setApiData([...apiData, response.data]);
            // unshift the new object
            setApiData([response.data, ...apiData]);
            setShowModal(false);
            showToast('Data added successfully!', 'success');
        } catch (error) {
            console.log(error);
        }
    };

    const updatePosts = async (id, userId, title, body) => {
        try {
            const response = await axiosInterceptor.put(`/posts/${id}`, { id, title, body, userId });
            const updatedData = apiData.map(item => 
                item.id === response.data.id ? response.data : item
            );
            setApiData(updatedData);
            setShowModal(false);
            showToast('Data updated successfully!', 'success');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;

        const fetchData = async () => {
            try {
                const getResponse = await axiosInterceptor.get('/posts?_limit=10');
                setApiData(getResponse.data);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchData();
    }, [setLoading]);
    return (
        <div className='m-2'>
            <div className='mt-2 mb-3'>
                <h4 className='container-inline'>API Data Display</h4>
                <button className='button-style button-right button-color mt-1' onClick={() => updateJson('new', '')}>Add New Post</button>
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
                updatePosts={updatePosts}
                newPost={newPost}
                setNewPost={setNewPost} />
        </div>
    );
};

const ModalPopup = ({ showModal, close, addPosts, updatePosts, newPost, setNewPost }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    useEffect(() => {
        if (showModal) {
            reset({ id: newPost.id, title: newPost.title, body: newPost.body, userId: newPost.userId });
        }
    }, [showModal, reset, newPost.id, newPost.userId, newPost.title, newPost.body]);

    const onBasicFormSubmit = () => {
        if (newPost.id) {
            updatePosts(newPost.id, newPost.userId, newPost.title, newPost.body);
        } else {
            addPosts(newPost.title, newPost.body );
        }
    };

    return (
        <>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>{!newPost.id ? 'New' : 'Update'} Post</Modal.Title>
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
                    <button className='button-style button-right button-color' onClick={handleSubmit(onBasicFormSubmit)}>
                        {!newPost.id ? 'Add Post' : 'Update Post'}
                    </button>
                    <button className='button-style' onClick={close}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default AxiosAPI;