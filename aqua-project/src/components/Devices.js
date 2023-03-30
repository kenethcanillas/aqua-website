import '../App.css';
import './Header.js';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function Devices() {
    const [glowLightCheck, setIsChecked1] = useState(false);
    const [coolingFanCheck, setIsChecked2] = useState(false);



    const glowLightBtn = () => {
      setIsChecked1(!glowLightCheck);
    };
    const coolingFanBtn = () => {
        setIsChecked2(!coolingFanCheck);
      };


    return(
        <>
        <div class="container">
            <div class="row-container">
                <div class="column-1">
                        <div class="column-content">
                            <span className='icons'>{<Icon icon="fa6-solid:lightbulb" color="#3f3f3f" width="72" height="72" />}</span>
                       </div>
                </div>
                <div class="column-2">
                        <div class="column-content">
                            <span className='icons'>{<Icon icon="fa6-solid:fan" color="#3f3f3f" width="72" height="72" />}</span>
                        </div>
                </div>
                <div class="column-3">
                        <div class="column-content">
                            <span className='icons'>{<Icon icon="ph:video-camera-fill" color="#3f3f3f" width="72" height="72" />}</span>
                        </div>
                </div>
            </div>
            <div className='row-container-2'>
                <table className='table-container'>
                    <tr className='theads-title'>
                        <th className='title-column'>Devices Controls</th>
                        <th className='title-status'>Status</th>
                    </tr>
                    <tr className='tbody-content'>
                        <td>Glow Light</td>
                        <td>    
                        <label class="switch" >
                            <input type="checkbox" checked={ glowLightCheck} onClick={glowLightBtn}/>
                            <span class="slider round"/> {glowLightCheck ? 'ON' : 'OFF'}
                        </label>
                        </td>
                    </tr>
                    <tr className='tbody-content'>
                    <td>Cooling Fan</td>
                        <td>
                        <label class="switch" >
                            <input type="checkbox" checked={coolingFanCheck} onClick={coolingFanBtn}/>
                            <span class="slider round"/> {coolingFanCheck ? 'ON' : 'OFF'}
                        </label>
                        </td>
                    </tr>
                    <tr className='tbody-content'>
                    <td>Live Camera</td>
                        <td>
                            <button className='cameraBtn'>Open Camera</button>
                        </td>
                    </tr>
                    <tr className='tbody-content'>
                    <td>Paired Devices</td>
                        <td>
                            <button className='pairedBtn'>  Paired Devices</button>
                        </td>
                    </tr>
                </table>
            </div>
    </div>
    </>
        );
}  
export default Devices;