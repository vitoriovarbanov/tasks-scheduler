import React from 'react';
import './assets/scss/main.scss';
//import history from './history';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchedulerParent from './components/scheduler/scheduler-parent';

function App() {
  return (
    <div className='App'>
      <SchedulerParent />
     {/*  <Route path='/welcome' element={<Home/>} /> */}
    </div>
  );
}

export default App;
