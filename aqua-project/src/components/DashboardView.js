import '../App.css';

function DashboardView() {
    
    return(
    <div class="grid-div">
    <div class="db-greenhouse">
        <div class="db-buttons">
            <a href="#"><span class="iconify" data-icon="carbon:view"></span> View All Data</a>
            <a href="#"><span class="iconify" data-icon="fluent-mdl2:report-document"></span> Reports</a>
        </div>
    <div class="display-container">
        <div class="temperature-container">
                <div class="temperature-display">
                    <h3>Temperature</h3>
                    <h2>32 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                    <p>Condition: Good</p>
                </div>
                <div class="temperature-data">
                    <table>
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
                    <h3>Humidity</h3>
                    <h2>32 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                    <p>Condition: Good</p>
                </div>
                <div class="humidity-data">
                    <table>
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
    </div>
        );
}  
export default DashboardView;