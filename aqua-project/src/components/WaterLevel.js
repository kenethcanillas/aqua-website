import '../App.css';
import './Header.js'
import { Icon } from '@iconify/react';


function WaterLevel() {
    
    return(
        <>
        <div class="db-greenhouse">
            <div class="display-container">
                <div class="temperature-container">
                        <div class="temperature-display">
                            <h3>PH Level</h3>
                            <h2>32 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                            <p>Condition: Good</p>
                        </div>
                </div>
                <div class="humidity-container">
                        <div class="humidity-display">
                            <h3>Electrical Conductivity Level</h3>
                            <h2>1000 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                            <p>Condition: Good</p>
                        </div>
                </div>
            </div>
    </div>
    </>
        );
}  
export default WaterLevel;