import React from 'react';
import {Form} from 'react-bootstrap';


export const SearchBar = ({onChange}) => {
    return (
        <Form.Control type="text" placeholder="Search..." onChange={onChange}/>
    )
}