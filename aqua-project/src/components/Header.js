import '../App.css';
import * as React from 'react';
import { Icon } from '@iconify/react';

function Header() {
    return ( <div class="nav_bar-container">
    <div class="nb-logo">
        {<Icon icon="icon-park-solid:leaves-two" color="#1c7a6a" hFlip={true} />}
         <h1 class="logo">AQUA</h1>
    </div>
   <ul class="nav-links">
    <li><a href="#" id="active-link"> Green House</a></li>
    <li><a href="#"> Water Condition</a></li>
    <li><a href="#">Water Level</a></li>
    <li><a href="#">Devices</a></li>
   </ul>
   <div class="nav-buttons">
         <p>Keneth Canillas</p><button type="button" class="nav-btn">{<Icon icon="gg:profile" color="#f2f2f2" width="48" height="48" hFlip={true} />}</button>

</div>
</div>
)        
    ;
  }
  
  export default Header;
  