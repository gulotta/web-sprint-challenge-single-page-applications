import React from "react";
import {Routes, Route, Link} from 'react-router-dom'
import PizzaForm from './PizzaForm'
import Pizza from './Assets/Pizza.jpg'
import style from './App.css'

const App = () => {
  return (
    <div className='App'>
      <h1>BloomTech Pizza</h1>
      <img src={Pizza}></img>
      <Link to= '/'><button>Home</button></Link>&nbsp;
      <Link to= '/pizza'><button id='order-pizza'>Order Pizza</button></Link>
      <Routes>
        <Route path='/pizza' element={<PizzaForm/>} />
      </Routes>

    </div>
  );
};
export default App;
