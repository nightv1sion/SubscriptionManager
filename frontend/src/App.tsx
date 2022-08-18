import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SubscriptionTable from './SubscriptionTable';
import { Col, Row } from 'react-bootstrap';
import CategoryTable from './CategoryTable';
import { Container } from 'react-bootstrap';
import { Category, Subscription, SubscriptionDto } from './Interfaces';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AuthPage from './AuthPage';
import { setAuthToken } from './Authentication';

function App() {

  const token = localStorage.getItem("token");
  if(token)
    setAuthToken(token);

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const selectCategory = (category: Category | undefined) => {
    setSelectedCategory(category);
  }

  return (
    <>
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path = "/" element = {<Home selectedCategory = {selectedCategory} selectCategory = {selectCategory}/>}>
        </Route>
        <Route path = "/login" element = {<AuthPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
