import Header from './components/Header';
import SideView from './components/SideView';
import DashboardView from './components/DashboardView';
import GreenHousePages from './pages/GreenHousePages';
import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {

  return(
   <>
   <Header/>

   <Router>
      <Route path='/'>
        <Route path="greenhousepages" component={<GreenHousePages/>}/>
      </Route>
    </Router>
 

   </>)
}
export default App;
