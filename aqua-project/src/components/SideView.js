import '../App.css';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from "react";


function SideView() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div class="grid-div">
    <div class="side-grid">
    <div class="sideview">
      <div class="hours_mins">
        
          <p class="hours"> {<Icon icon="ic:round-access-time" color="#3f3f3f" />}{date.toLocaleTimeString()}</p>
          <p class="dates">{date.toLocaleDateString()}</p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default SideView;
  