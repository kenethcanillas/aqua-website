import '../App.css';
import './Header.js';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Table from 'react-bootstrap/esm/Table';


function Devices() {
    const [glowLightCheck, setIsChecked1] = useState(false);
    const [coolingFanCheck, setIsChecked2] = useState(false);
    const [airPumpCheck, setIsChecked3] = useState(false);

    const glowLightBtn = () => {
      setIsChecked1(!glowLightCheck);
    };
    const coolingFanBtn = () => {
        setIsChecked2(!coolingFanCheck);
      };
      const airPumpBtn = () => {
        setIsChecked3(!airPumpCheck);
      };


    return(
        <>
        <div class="container pt-4">
            <div className='row-container'>
                <div class="column-1">
                        <div className='column-content p-md-1'>
                            <span className='icons p-5' >{<Icon icon="fa6-solid:lightbulb" color="#3f3f3f" width="72" height="72" />}</span>
                       </div>
                </div>
                <div class="column-2">
                        <div class="column-content">
                            <span className='icons p-5'>{<Icon icon="fa6-solid:fan" color="#3f3f3f" width="72" height="72" />}</span>
                        </div>
                </div>
                <div class="column-3">
                        <div class="column-content">
                            <span className='icons p-5'>{<Icon icon="ic:round-heat-pump"  color="#3f3f3f" width="72" height="72" />}</span>
                        </div>
                </div>
            </div>
            <div className='row-container-2'>
                <Table bordered>
                    <thead>
                        <tr>
                            <th className='title-column'>Devices Controls</th>
                            <th className='title-status'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Glow Light</td>
                            <td>    
                            <label class="switch" >
                                <input type="checkbox" checked={ glowLightCheck} onClick={glowLightBtn}/>
                                <span class="slider round"/> {glowLightCheck ? 'ON' : 'OFF'}
                            </label>
                            </td>
                        </tr>
                        <tr>
                        <td>Cooling Fan</td>
                            <td>
                            <label class="switch" >
                                <input type="checkbox" checked={coolingFanCheck} onClick={coolingFanBtn}/>
                                <span class="slider round"/> {coolingFanCheck ? 'ON' : 'OFF'}
                            </label>
                            </td>
                        </tr>
                        <tr>
                            <td>Air Pump</td>
                            <td>    
                            <label class="switch" >
                                <input type="checkbox" checked={ airPumpCheck} onClick={airPumpBtn}/>
                                <span class="slider round"/> {airPumpCheck ? 'ON' : 'OFF'}
                            </label>
                            </td>
                        </tr>
                        <tr>
                        <td>Paired Devices</td>
                            <td>
                                <button className='pairedBtn'>  Paired Devices</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    </div>
    </>
        );
}  
export default Devices;