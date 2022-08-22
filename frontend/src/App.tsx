import React, { useState } from 'react';
import './App.css';
import { Category} from './Interfaces';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import AuthPage from './AuthPage';
import { setAuthToken } from './Authentication';
import Main from './Main';

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
      <Routes>
        <Route path = "/" element = {<Main selectedCategory = {selectedCategory} selectCategory = {selectCategory}/>}>
        </Route>
        <Route path = "/login" element = {<AuthPage />} >
        </Route>
      </Routes>
      
    </BrowserRouter>
    
    </>
  );
}

export default App;
