import '../App.css';
import { Icon } from '@iconify/react';

function countdown(){
    const hoursEL = document.getElementById("hours");
    const dateEL = document.getElementById("date");

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();

    const date = now.getDate(); 
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const hours = now.getHours(); 
    const minutes = now.getMinutes(); 
    const seconds = now.getSeconds(); 


    const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    hoursEL.innerHTML = time;
    dateEL.innerHTML = monthNames[month-1]+"  "+date+",  "+year;
}
countdown();
setInterval(countdown, 1000);

function SideView() {
    return ( 
    <div class="db-col-1">
        <div class="hours_mins">
            <Icon icon="ic:round-access-time" color="#3f3f3f" width="48" height="48" />
            <p  class="hours" id="hours"></p>
        </div>
    <div class="dates">
        <p id="date"></p>
    </div>
    <div class="temp">  
        <h2>34 <span class="iconify" data-icon="tabler:temperature-celsius"></span></h2>
    </div>
</div>
);

  }
  export default SideView;
  