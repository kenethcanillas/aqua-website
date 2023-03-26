import Header from './components/Header';
import SideView from './components/SideView';
import DashboardView from './components/DashboardView';
import GreenHousePages from './pages/GreenHousePages';
import './App.css';
import { BrowserRouter as  Router, Routes, Route, } from "react-router-dom";

function App() {

  return(
   <>
   <Header/>
   <Router>
    <Routes>
   <Route path="/greenhousepage" element={ <GreenHousePages/>}/>
   </Routes>
   </Router>
  
   
   
 
 

   </>)
}
export default App;
