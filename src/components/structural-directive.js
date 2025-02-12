import React, { useState} from 'react';
import { Trash } from 'react-bootstrap-icons';

const StructuralDirective = () => {
    const [trueCondition, setTrueCondition] = useState(true);
    let empObj = [{name: 'Rik', id: '204'}, {name: 'th', id: ''}, {name: 'vik', id: '990'}];
    const employeeListCondition = empObj;
    const [employeeList, setEmployeeList] = useState(empObj);

    const updateNgIf = () => {
        setTrueCondition(!trueCondition);
    }

    const addEmployee = () => {
        const employeeListCount = employeeList.length + 1;
        setEmployeeList([...employeeList,({name: 'New Employee' + employeeListCount, id: employeeListCount })]);
    }

    const deleteEmployee = (index) => {
        setEmployeeList(employeeList.filter((_, i) => i !== index));
    }

    return (
        <div className='m-2'>
            <div>
                <p className='font-weight-bold'>ngIf</p>
                { trueCondition ? <div>True</div> : <div>False</div>}
                { !trueCondition ? <div>True</div> : <div>False</div>}
                <div>Tried ngIf in React - {trueCondition ? 'Yes' : 'No'}</div>
                <button className='button-style' onClick={updateNgIf}>Update ngIF value</button>
                <hr></hr>
            </div>
            <div>
                <p className='font-weight-bold'>ngFor</p>
                <p className='font-style-italic'>With Condition in Loop</p>
                {employeeListCondition.map((item, index) => {
                    return (
                        item.id > 0 ? <div key={index}>{index +1}-{item.name}</div> : <div key={index}>{index + 1}-Invalid Employee </div>
                    )
                })}
                {/* key is neccessary or not */}
                {/* {employeeList.map((item, index) => <div>{item.name}</div>)} */}
                <hr className='hr-center'></hr>

                <p className='font-style-italic'>Without Condition in Loop 
                <span>
                    <button className='button-style ms-2' onClick={addEmployee}>Add</button>
                    <button className='button-style ms-2' onClick={() => setEmployeeList([])}>Remove All</button>
                </span>
                </p>
                {employeeList.map((item, index) => { 
                    return (
                        <div key={index}>
                            {index +1}-{item.name}
                            <span>
                                <Trash color="red" size={15} onClick={() => deleteEmployee(index)} />
                            </span>
                        </div>
                    )
                })}
                <hr></hr>
            </div>
        </div>
    )
}

export default StructuralDirective;
