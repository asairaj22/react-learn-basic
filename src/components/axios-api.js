import React, { useState, useEffect, useRef } from 'react';
import axiosInterceptor from '../Interceptor/axiosInterceptor';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import { Trash, Pencil, CloudArrowDownFill, XCircle } from 'react-bootstrap-icons';
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
    const [newPost, setNewPost] = useState({ item: '', price: '', quantity: '' });

    // Code to update Loader/Toast value in component
    const { setLoading } = useLoading();
    const showToast = useToast();

    // Fetch API called twice - Below help to stop calling twice
    const hasFetchedData = useRef(false);

    const updateJson = async (type, value) => {
        if (type === 'delete') {
            try {
                await axiosInterceptor.delete(`/deleteData/${value}`);
                const updatedResponse = apiData?.filter((item) => {
                    return item._id !== value;
                })
                setApiData(updatedResponse);
                showToast('Data deleted successfully!', 'success');
            } catch (error) {
                console.log(error);
            }
        } else if (type === 'download') {
            try {
                const response = await axiosInterceptor.post('/downloadFileInAzure', { id: value._id, filename: value.filename }, {
                    responseType: 'blob',
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = value.filename || 'downloaded-file.txt';
                document.body.appendChild(link);
                link.click();
                link.remove();
                showToast('Download started!', 'success');
            } catch (error) {
                console.log(error);
                showToast('Error downloading file', 'danger');
            }
        }else if (type === 'new') {
            setNewPost({ item: '', price: '', quantity: '', });
            setShowModal(true);
        } else {
            setNewPost({ item: value.item, price: value.price, quantity: value.quantity, _id: value._id, filename: value.filename });
            setShowModal(true);
        }
    }

    const addPosts = async (item, price, quantity, reactFile) => {
        try {
            const formData = new FormData();
            formData.append('item', item);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('reactFile', reactFile);
            const response = await axiosInterceptor.post('/addData', formData);
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

    const updatePosts = async (id, item, price, quantity, existingDeletedFileName, reactFile) => {
        try {
            console.log({ item, price, quantity, reactFile });
            const formData = new FormData();
            formData.append('id', id);
            formData.append('item', item);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('existingDeletedFileName', existingDeletedFileName);
            formData.append('reactFile', reactFile);
            const response = await axiosInterceptor.put('/updateData', formData);
            const updatedData = apiData?.map(obj => 
                obj._id === response.data._id ? response.data : obj
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
                const getResponse = await axiosInterceptor.get('/getAllData');
                setApiData(getResponse?.data);
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
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Download</th>
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
                                    <td>{element.item}</td>
                                    <td>{element.price}</td>
                                    <td>{element.quantity}</td>
                                    <td>{new Date(element.date).toLocaleDateString()}</td>
                                    <td>
                                    { element.filename ? 
                                        <CloudArrowDownFill size={15} onClick={() => updateJson('download', element)} /> : 
                                        null
                                    }
                                    </td>
                                    <td><Pencil color="blue" size={15} onClick={() => updateJson('edit', element)} /></td>
                                    <td><Trash color="red" size={15} onClick={() => updateJson('delete', element._id)} /></td>
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
            reset({ _id: newPost._id, item: newPost.item, price: newPost.price, quantity: newPost.quantity });
        }
    }, [showModal, reset, newPost]);

    const onBasicFormSubmit = () => {
        if (newPost._id) {
            newPost.existingDeletedFileName = newPost.existingDeletedFileName ? newPost.existingDeletedFileName : null;
            updatePosts(newPost._id, newPost.item, newPost.price, newPost.quantity, newPost.existingDeletedFileName, newPost.reactFile);
        } else {
            addPosts(newPost.item, newPost.price, newPost.quantity, newPost.reactFile );
        }
    };

    const onFileChange = (event) => {
        setNewPost({ ...newPost, reactFile: event.target.files[0] });
    };

    const onFileDelete = () => {
        setNewPost({ ...newPost, existingDeletedFileName: newPost.filename ? newPost.filename : null, filename: null, reactFile: null });
    };

    return (
        <>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>{!newPost._id ? 'New' : 'Update'} Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-post-container">
                        <form onSubmit={handleSubmit(onBasicFormSubmit)}>
                            <input 
                                {...register("item", {
                                    required: { value: true, message: "Title is required" },
                                    minLength: { value: 3, message: 'Minimum 3 characters' },
                                })}
                                placeholder='Enter Title'
                                type="text"
                                className="form-control"
                                value={newPost.item}
                                onChange={(e) => setNewPost({ ...newPost, item: e.target.value })}
                            />
                            {errors.item && <span className='error-message'>{errors.item.message}</span>}
                            <div className='mt-2'></div>
                            <input 
                                {...register("quantity", {
                                    required: { value: true, message: "Quantity is required" },
                                })}
                                placeholder='Enter Quantity'
                                type="text"
                                className="form-control"
                                value={newPost.quantity}
                                onChange={(e) => setNewPost({ ...newPost, quantity: e.target.value })}
                            />
                            {errors.quantity && <span className='error-message'>{errors.quantity.message}</span>}
                            <div className='mt-2'></div>
                            <textarea
                                {...register("price", {
                                    required: { value: true, message: "Price is required" },
                                    minLength: { value: 2, message: 'Minimum 2 characters' },
                                })}
                                placeholder="Enter Price"
                                className="form-control"
                                cols="1"
                                rows="1"
                                value={newPost.price}
                                onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
                            />
                            {errors.price && <span className='error-message'>{errors.price.message}</span>}

                            {newPost.filename && (
                                <div className="mt-2 mb-2">
                                    <XCircle color="red" size={15} onClick={onFileDelete}/>
                                    <span className='ms-2'>{newPost.filename}</span>
                                </div>
                            )}

                            {!newPost.filename && (
                                <div className="mt-2 mb-2">
                                    <input type="file" className="form-control" onChange={onFileChange}/>
                                </div>
                            )}
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-style button-right button-color' onClick={handleSubmit(onBasicFormSubmit)}>
                        {!newPost._id ? 'Add Post' : 'Update Post'}
                    </button>
                    <button className='button-style' onClick={close}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default AxiosAPI;