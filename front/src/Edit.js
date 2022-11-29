import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { editState, editStateChange, editDetails, editDetailsChange } from './Bank';
import { makeRequest } from "./Api";
import Nav from 'react-bootstrap/Nav';
import { ArrowLeft, CheckLg, AlignEnd, AlignStart } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';


export default function Edit() {
    const editS = editState((state) => state);
    const editD = editDetails((state) => state);
    

    function EditParts({orr}) {
      let a;
      let b;

      switch (orr){
        case 'start':
          a = editD.additions[0]
          b = 'Start'
          break
        case 'end':
          a = editD.additions[1]
          b = 'End'
          break
        default:
          throw Error(`orr bad input: ${orr}`)
      };

      return (
        <>
        <p className="mt-3 fs-6">{b}</p>
        <Form.Control className='w-25' defaultValue={a}/>
        </>
      )
    };
    

    useEffect(() => {
      if (typeof(editS.content) !== 'undefined') {
      makeRequest('PUT', 'filter_data', editDetailsChange, {content: editS.content, typee: editS.typee}, false)
      }
    }, [editS.typee, editS.content])
    
    
    if (typeof(editD.additions) !== 'undefined' && typeof(editD.main_table) !== 'undefined') {
      let end
      let start
  
      if (editD.start === true) {
        start = <EditParts orr='start'/>
      }
  
      if (editD.end) {
        end = <EditParts orr='end'/>
      }
  
      let end2
      let start2
  
      if (editD.additions[0] !== '') {
        start2 = <InputGroup.Text>{editD.additions[0]}</InputGroup.Text>
      };
  
      if (editD.additions[1] !== '') {
        end2 = <InputGroup.Text>{editD.additions[1]}</InputGroup.Text>
      };

      return (
        <>
        <Container className='mt-3 border'>
          <Nav className='mt-3 mb-2 p-2 border rounded bg-light'>
            <Button variant='primary' className='ms-1' onClick={() => {
              editStateChange({show: false});
              editDetailsChange({start: false});
              editDetailsChange({end: false})}
              }><ArrowLeft/> Back</Button>
            <Button variant='warning' className='ms-1' onClick={() => {editDetailsChange({start: true})}}><AlignEnd/> Edit start</Button>
            <Button variant='warning' className='ms-1' onClick={() => {editDetailsChange({end: true})}}><AlignStart/> Edit end</Button>
            <Button variant='success' className='ms-1'><CheckLg/> Save</Button>
          </Nav>
            <Container className='mb-3 mt-3'>
              <InputGroup className='w-50'>
                {start2}
                <Form.Control defaultValue={editD.main_table[0]}/>
                {end2}
              </InputGroup>
              {start}
              {end}
            </Container>
        </Container>
        </>
      )
    } else {
      return (
        <Spinner animation="border" variant="secondary" />
      )
    }
  }

