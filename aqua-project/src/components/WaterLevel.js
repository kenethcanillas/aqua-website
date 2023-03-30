import '../App.css';
import './Header.js';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function WaterLevel() {
    const [waterBtnCheck, setIsChecked1] = useState(false);
    const [snapABtnCheck, setIsChecked2] = useState(false);
    const [snapBBtnCheck, setIsChecked3] = useState(false);



    const waterBtn = () => {
      setIsChecked1(!waterBtnCheck);
    };
    const snapABtn = () => {
        setIsChecked2(!snapABtnCheck);
      };
    const snapBBtn = () => {
        setIsChecked3(!snapBBtnCheck);
    };

    return(
        <>
        <div class="container">
            <div class="row-container">
                <div class="column-1">
                        <div class="column-content">
                            <h3 className='content-title'>Water</h3>
                            <h2 className='content-value'>32 <span className='value-icon'>%</span></h2>
                            <p className='content-condition'>Condition: Good</p>
                        </div>
                </div>
                <div class="column-2">
                        <div class="column-content">
                            <h3 className='content-title'>Snap A</h3>
                            <h2 className='content-value'>32 <span className='value-icon'>%</span></h2>
                            <p className='content-condition'>Condition: Good</p>
                        </div>
                </div>
                <div class="column-3">
                        <div class="column-content">
                            <h3 className='content-title'>Snap B</h3>
                            <h2 className='content-value'>32 <span className='value-icon'>%</span></h2>
                            <p className='content-condition'>Condition: Good</p>
                        </div>
                </div>
            </div>
            <div className='row-container-2'>
                <table className='table-container'>
                    <tr className='theads-title'>
                        <th className='title-column'>Pump Controls</th>
                        <th className='title-status'>Status</th>
                    </tr>
                    <tr className='tbody-content'>
                        <td>Water Pump</td>
                        <td>    
                        <label class="switch" >
                            <input type="checkbox" checked={waterBtnCheck} onClick={waterBtn}/>
                            <span class="slider round"/> {waterBtnCheck ? 'ON' : 'OFF'}
                        </label>
                        </td>
                    </tr>
                    <tr className='tbody-content'>
                    <td>Snap A Pump</td>
                        <td>
                        <label class="switch" >
                            <input type="checkbox" checked={snapABtnCheck} onClick={snapABtn}/>
                            <span class="slider round"/> {snapABtnCheck ? 'ON' : 'OFF'}
                        </label>
                        </td>
                    </tr>
                    <tr className='tbody-content'>
                    <td>Snap B Pump</td>
                        <td>
                        <label class="switch" >
                            <input type="checkbox" checked={snapBBtnCheck} onClick={snapBBtn}/>
                            <span class="slider round"/> {snapBBtnCheck ? 'ON' : 'OFF'}
                        </label>
                        </td>
                    </tr>
                </table>
            </div>
    </div>
    </>
        );
}  
export default WaterLevel;