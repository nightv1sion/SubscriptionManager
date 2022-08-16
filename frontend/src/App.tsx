import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SubscriptionTable from './SubscriptionTable';
import { Col, Row } from 'react-bootstrap';
import CategoryTable from './CategoryTable';
import { Container } from 'react-bootstrap';
import { Category, Subscription, SubscriptionDto } from './Interfaces';

function App() {


  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const selectCategory = (category: Category | undefined) => {
    setSelectedCategory(category);
  }

  return (
      <Container fluid>
        <Row>
          <Col sm={9}><SubscriptionTable category = {selectedCategory ? selectedCategory : undefined}/></Col>
          <Col sm={3}><CategoryTable setSelectedCategory = {selectCategory} /></Col>
        </Row>
      </Container>
  );
}

export default App;
