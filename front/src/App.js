import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FiltersList from "./FiltersList";
import { makeRequest } from "./Api";
import { syncthingEntriesChange, dropItEntriesChange, syncthingEntries, dropItEntries } from './Bank'
import Edit from "./Edit";
import { editState } from './Bank'
import { useEffect } from 'react';


function App() {
  const editS = editState((state) => state)
  const syncthingEntriess = syncthingEntries((state) => state.result)
  const dropItEntriess = dropItEntries((state) => state.result)

  useEffect(() => {
    makeRequest('GET', 'filters_main/syncthing', syncthingEntriesChange);
    makeRequest('GET', 'filters_main/drop_it', dropItEntriesChange);
    document.title = 'Filter creator v2'
  }, [editS.show])


  if (editS.show === true) {
    return(<Edit/>)
  } else {
  return (
    <Container>
      <Row>
        <Col>
          <p className="fs-4">Syncthing</p>
          <FiltersList data={syncthingEntriess}/>
        </Col>
        <Col>
          <p className="fs-4">Drop it</p>
          <FiltersList data={dropItEntriess}/>
        </Col>
      </Row>
    </Container>
  );
  }
}

export default App;
