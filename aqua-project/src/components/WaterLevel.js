import '../App.css';
import './Header.js';

import Table from 'react-bootstrap/esm/Table';
import React, { useState } from 'react';

function WaterLevel() {
    const [waterBtnCheck, setIsChecked1] = useState(false);
    // const [snapABtnCheck, setIsChecked2] = useState(false);
    // const [snapBBtnCheck, setIsChecked3] = useState(false);

    const waterBtn = () => {
      setIsChecked1(!waterBtnCheck);
    };
    // const snapABtn = () => {
    //     setIsChecked2(!snapABtnCheck);
    //   };
    // const snapBBtn = () => {
    //     setIsChecked3(!snapBBtnCheck);
    // };

    return(
        <>
        <div class="container  pt-4">
            <div className='row-container'>
                <div class="column-1">
                        <div class="column-content p-xs-2">
                            <h3 className='content-title '>Water</h3>
                            <h2 className='content-value'>32 <span className='value-icon'>%</span></h2>
                            <p className='content-condition'>Condition: Good</p>
                        </div>
                </div>
            </div>
            <div className='row-container-2'>
                <Table bordered>
                   <thead>
                        <tr>
                            <th className='title-column'>Pump Controls</th>
                            <th className='title-status'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Water Pump</td>
                            <td>    
                                <label class="switch" >
                                    <input type="checkbox" checked={waterBtnCheck} onClick={waterBtn}/>
                                    <span class="slider round"/> {waterBtnCheck ? 'ON' : 'OFF'}
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </Table>
 
            </div>
    </div>
    </>
        );
}  
export default WaterLevel;