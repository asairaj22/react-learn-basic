import React, { useReducer } from 'react';

//creating reducer and passing dispatch
const reducer = (state, action) => {
    if (action.type === 'DELETE_PERSON') {
        const newPersons = state.data.filter((eachPerson) => {
            return eachPerson.id !== action.payload
        })
        console.log(newPersons);
        return {
            ...state,
            data: newPersons,
            length: state.length - 1
        }

    }

    if (action.type === 'UPDATE_PERSON') {
        const updatePerson = state.data.map((eachPerson) => {
            if (eachPerson.id === action.payload) {
                return { ...eachPerson, firstName: 'updated using dispatch!!!' };
            }
            return eachPerson;
        })
        return {
            ...state,
            data: updatePerson,
            length: state.length
        }
    }

    return state;
};

const UseReducerConcept = (props) => {
    //creating initialState with  array of objects

    const initialState = {
        data: [
            { id: '1', firstName: "Divya", email: "divya@gmail.com" },
            { id: '2', firstName: "Senthil", email: "senthil@gmail.com" },
            { id: '3', firstName: "Rithu", email: "rithu@gmail.com" }
        ],
        length: 3,
    }


    useReducer(reducer, initialState);

    console.log(useReducer(reducer, initialState));  // it will print initial state and function. This function we have pass it to reducer.
    const [state, dispatch] = useReducer(reducer, initialState) //assigning these state and dispatch //

    const handleDelete = (id) => {
        console.log(id);
        // to delete object from state using id, we can delete with dispatch 
        dispatch({
            type: 'DELETE_PERSON',
            payload: id
        })
    }

    const handleEdit = (id) => {
        //update the object
        dispatch({
            type: 'UPDATE_PERSON',
            payload: id
        }

        )
    }

    return (
        <div className='m-2'>
            <p>Screen is useReducerConcept</p>
            <h1>Current users length: {state.length}</h1>
            <div>{state.data.map((eachItem) => {
                return (
                    <div key={eachItem.id}>
                        <h3>{eachItem.firstName}</h3>
                        <p>{eachItem.email}</p>
                        <button onClick={() => handleDelete(eachItem.id)}>Delete</button>
                        <button className='button-space' onClick={() => handleEdit(eachItem.id)}>Edit</button>
                    </div>
                );
            })}</div>
        </div>
    )
}

export default UseReducerConcept;
