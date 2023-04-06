import Header from './components/Header';

import GreenHousePages from './pages/GreenHousePages';
import WaterConditionPages from './pages/WaterConditionPage';
import WaterLevelPage from './pages/WaterLevelPage';
import DevicesPage from './pages/DevicesPage';


import './App.css';
import { BrowserRouter as  Router, Routes, Route, } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return(
   <>
   
   <Router>
   <Header/>
      <Routes>
        <Route path="/" element={<GreenHousePages/>}/>
        <Route path="/greenhousepage" element={ <GreenHousePages/>}/>
        <Route path="/waterconditionpage" element={ <WaterConditionPages/>}/>
        <Route path="/waterlevelpage" element={ <WaterLevelPage/>}/>
        <Route path="/devicespage" element={ <DevicesPage/>}/>

    </Routes>
   </Router>
  
   
   
 
 

   </>)
}
export default App;
