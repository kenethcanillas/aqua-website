import '../App.css';
import './Header.js'
import { Icon } from '@iconify/react';


function WaterCondition() {
    
    return(
        <>
            <div class="db-greenhouse">
                <div class="db-buttons">
                    <a href="#">{<Icon icon="icon-park-outline:eyes" width="16" height="16" />} View All Data</a>
                    <a href="#">{<Icon icon="fluent-mdl2:report-document" width="16" height="16" />} Reports</a>
                </div>
            <div class="display-container">
                <div class="temperature-container">
                        <div class="temperature-display">
                            <h3>PH Level</h3>
                            <h2>32 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                            <p>Condition: Good</p>
                        </div>
                        <div class="temperature-data">
                            <table className='table-container'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Value Data </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                    <td>11/13/23</td>
                                        <td>38 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
                <div class="humidity-container">
                        <div class="humidity-display">
                            <h3>Electrical Conductivity Level</h3>
                            <h2>1000 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                            <p>Condition: Good</p>
                        </div>
                        <div class="humidity-data">
                            <table className='table-container'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Value Data </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                    <td>11/13/23</td>
                                        <td>38 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
    </div>
    </>
        );
}  
export default WaterCondition;