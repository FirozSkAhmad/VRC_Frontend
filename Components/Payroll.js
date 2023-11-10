import React from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState } from 'react';
import { TextField, InputAdornment, Autocomplete } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import baseurl from '../data/baseurl'

function Payroll() {

    const { token } = useContext(sharedContext);

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit clicked");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "role_type": role,
            "amount": amount,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/payroll/addPayRollDetails`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // AddRow(result.data)
                // handleClose()
                clearFields()
            })
            .catch(error => console.log('error', error));
    };

    const onChangeInput = (e) => {
        console.log(e.target.name)
        switch (e.target.name) {
            case 'name': setName(e.target.value);
                break;
            case 'amount': setAmount(e.target.value);
                break;
        }
    }

    const handleAutocompleteChange = (fieldName, newValue) => {
        switch (fieldName) {
            case 'role': setRole(newValue);
                break;
        }
    };

    const clearFields = () => {
        setName('');
        setRole('')
        setAmount('');
    }

    return (
        <div className='PayrollCard'>
            <h2>Payroll</h2>
            <form onSubmit={handleSubmit} className='prDeatails__Box'>
                <div className='prFields__Box'>
                    <div className='prDeatails__Fld'>{/*class="flex items-center gap-10 flex-wrap"*/}
                        <p>Name</p>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
                        <TextField className='nText__Fld'
                            type="text"
                            value={name}
                            onChange={onChangeInput}
                            placeholder='Enter Name'
                            required
                            autoComplete="off"
                            name='name'
                        />
                    </div>
                    <div className='prDeatails__Fld'>
                        <p>Role Type</p>
                        <Autocomplete className='nText__Fld'
                            options={["Accountant", "Document Writer", "Office Boy", "Maid", "Priest", "Director 1", "Director 2"]}
                            value={role}
                            onChange={(event, newValue) => handleAutocompleteChange('role', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Role Type"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className='prDeatails__Fld'>{/*class="flex items-center gap-10 flex-wrap"*/}
                        <p>Amount</p>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
                                                <TextField
                            className='nText__Fld'
                            type="text"
                            value={amount}
                            onChange={onChangeInput}
                            placeholder='Enter Amount'
                            required
                            autoComplete="off"
                            name='amount'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0V2H4C5.704 2 7.94 3.038 8.72 5H0V7H8.97C8.66 9.61 5.974 11 4 11H0V13.47L10.25 22H13.375L2.562 13H4C7.234 13 10.674 10.61 10.97 7H16V5H10.812C10.51 3.816 9.86 2.804 9 2H16V0H0Z" fill="black" />
                                        </svg>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
                <div onClick={handleSubmit} className='payrollSub__Btn'>
                    <button>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default Payroll