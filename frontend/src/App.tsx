import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskTable from './TaskTable';
import { Col, Row } from 'react-bootstrap';
import CategoryTable from './CategoryTable';
import { Container } from 'react-bootstrap';

function App() {
  return (
      <Container fluid>
        <Row>
          <Col sm={9}><TaskTable/></Col>
          <Col sm={3}><CategoryTable /></Col>
        </Row>
      </Container>
  );
}

export default App;
