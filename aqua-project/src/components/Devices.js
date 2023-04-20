import '../App.css';
import './Header.js';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Table from 'react-bootstrap/esm/Table';


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



        <div class="container pt-4">
            <div className='row-container'>
                <div class="column-1">
                        <div class="column-content p-xs-2">
                            <h3 className='content-title'>Grow Light</h3>
                            <h2 className='content-value'>
                                {<Icon icon="fa6-solid:lightbulb"  width="72" height="72" />}
                            </h2>  
                            <p className='content-condition'>Status: {glowLightCheck ? 'ON' : 'OFF'}</p>
                        </div>
                </div>
                <div class="column-2">
                        <div class="column-content p-xs-2">
                            <h3 className='content-title'>Cooling Fan</h3>
                            <h2 className='content-value'>
                                {<Icon icon="fa6-solid:fan" width="72" height="72" />}
                            </h2>  
                            <p className='content-condition'>Status: {coolingFanCheck ? 'ON' : 'OFF'}</p>
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

                    </tbody>
                </Table>
            </div>
    </div>
    </>
        );
}  
export default Devices;