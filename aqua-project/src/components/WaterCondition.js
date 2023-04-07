import '../App.css';
import './Header.js'
import { Icon } from '@iconify/react';
import React,{useEffect, useState} from 'react';
import db from '../firebase';
import {query, collection,orderBy, onSnapshot} from "firebase/firestore"


function WaterCondition() {
    const [ecData, setEcData] = useState({});
    const [phData, setPhData] = useState({});
// const ref = collection(db, 'ec_level')
useEffect(()=>{
  const q = query(collection(db,'ec_level'), orderBy('datetime', 'asc'));
const p = query(collection(db,'ph_level'), orderBy('datetime', 'asc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
          setEcData(change.doc.data())
      }
    });
  });
  onSnapshot(p, (snapshot)=>{
    snapshot.docChanges().forEach((change)=>{
        if(change.type === "added"){
            setPhData(change.doc.data());
        }
    })
  })
},[]);
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
                            <h2>{Object.keys(phData).length !== 0 ? phData.value : "" } <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
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
                            <h2>{Object.keys(ecData).length !== 0  ? ecData.value : ""}<span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
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