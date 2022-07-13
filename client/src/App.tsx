import React from 'react';
import './assets/scss/main.scss';
//import history from './history';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchedulerParent from './components/scheduler/scheduler-parent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <SchedulerParent />
        {/*  <Route path='/welcome' element={<Home/>} /> */}
      </div>
    </Router>

  );
}

export default App;
