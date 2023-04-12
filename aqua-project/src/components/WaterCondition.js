import '../App.css';
import './Header.js'
import { Icon } from '@iconify/react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';


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
                            <Table bordered hover className='table-container-bootstrap'>
                                <thead className='p-2'>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Value Data </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>11/13/23</td>
                                        <td>38 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Pagination size='md'>
                                <Pagination.First />
                                    <Pagination.Prev>Prev</Pagination.Prev>
                                        <Pagination.Item active>{1}</Pagination.Item>
                                        <Pagination.Item>{2}</Pagination.Item>
                                        <Pagination.Item>{3}</Pagination.Item>
                                        <Pagination.Item>{4}</Pagination.Item>
                                        <Pagination.Item>{5}</Pagination.Item>
                                    <Pagination.Next>Next</Pagination.Next>
                                <Pagination.Last />
                            </Pagination>
                    </div>
                </div>
                <div class="humidity-container">
                        <div class="humidity-display">
                            <h3 className='title'>Electrical Conductivity Level</h3>
                            <h2>1000 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
                            <p>Condition: Good</p>
                        </div>
                        <div class="humidity-data">
                        <Table bordered hover className='table-container-bootstrap'>
                                <thead className='p-2'>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Value Data </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>11/13/23</td>
                                        <td>38 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>11/12/23</td>
                                        <td>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Pagination size='md'>
                                <Pagination.First />
                                    <Pagination.Prev>Prev</Pagination.Prev>
                                        <Pagination.Item active>{1}</Pagination.Item>
                                        <Pagination.Item>{2}</Pagination.Item>
                                        <Pagination.Item>{3}</Pagination.Item>
                                        <Pagination.Item>{4}</Pagination.Item>
                                        <Pagination.Item>{5}</Pagination.Item>
                                    <Pagination.Next>Next</Pagination.Next>
                                <Pagination.Last />
                            </Pagination>
                        </div>
                </div>
            </div>
    </div>
    </>
        );
}  
export default WaterCondition;