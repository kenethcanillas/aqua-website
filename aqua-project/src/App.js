import Header from './components/Header';

import GreenHousePages from './pages/GreenHousePages';
import WaterConditionPages from './pages/WaterConditionPage';

import './App.css';
import { BrowserRouter as  Router, Routes, Route, } from "react-router-dom";

function App() {

  return(
   <>
   
   <Router>
   <Header/>
      <Routes>
        <Route path="/" element={<GreenHousePages/>}/>
        <Route path="/greenhousepage" element={ <GreenHousePages/>}/>
        <Route path="/waterconditionpage" element={ <WaterConditionPages/>}/>

    </Routes>
   </Router>
  
   
   
 
 

   </>)
}
export default App;
