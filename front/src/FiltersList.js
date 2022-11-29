import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { editStateChange } from './Bank';
import { Placeholder } from 'react-bootstrap';


export default function FiltersList(data) {

    function AddNew() {
        return (
            <>
            <tr>
                {[...Array(3)].map(() => {return <td><Placeholder bg='success' className='w-100'/></td>})}
                <td>
                    <Button variant='success'>Dodaj nowy</Button>
                </td>
            </tr>
            </>
        )
    };


    if (typeof(data.data) != 'undefined') {
      return (
        <Table striped bordered>
        <thead>
            <tr>
                <th>#</th>
                <th>filter</th>
                <th>target</th>
                <th>Akcja</th>
            </tr>
        </thead>
        <tbody>
            <AddNew/>
            {data.data.map((item, index) => {return (
            <>
            <tr key={index}>
                <td>{index}</td>
                <td>{item[0]}</td>
                <td>{item[3]}</td>
                <td>
                    <Button variant='primary' onClick={() => {editStateChange({show: true, content: item[0], typee: item[1]})}}>Edit</Button>
                    <Button variant='danger' className='ms-1'>Remove</Button>
                </td>
            </tr>
            </>
            )})}
            <AddNew/>
        </tbody>
    </Table>
      )
    } else {
        return (
            <Spinner animation="border" variant="secondary" />
        )
    }};


