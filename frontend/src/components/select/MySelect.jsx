import React from 'react';
import './../../styles/App.css'
import Form from "react-bootstrap/Form";

const MySelect = ({options, value, onChange}) => {
    return (
        <Form.Select
            aria-label="Default select example"
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </Form.Select>
    );
};

export default MySelect;